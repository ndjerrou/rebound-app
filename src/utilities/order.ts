import { GetAddressPayPal, GetOrderPayPal } from '@paypal/react-paypal-js';

import { CURRENCY_CODE } from '../constants/constants';

export const formatCoupon: FormatCoupon = (discount, totalPrice) => {
  let newTotalPrice = String(totalPrice);

  let totalDiscount = discount?.amount || '0';

  switch (discount?.discount_type) {
    case 'percent': {
      const amount = Number(discount?.amount) / 100;

      totalDiscount = String(totalPrice * amount);

      newTotalPrice = String(totalPrice - Number(totalDiscount));

      break;
    }

    case 'fixed_cart':
      newTotalPrice = String(totalPrice - Number(totalDiscount));

      break;

    case 'fixed_product':
      break;

    default:
      break;
  }

  return { newTotalPrice, totalDiscount };
};

export const getAddressPayPal: GetAddressPayPal = ({
  address: address_line_1 = '',
  addressDetails: address_line_2 = '',
  city: admin_area_2 = '',
  country: country_code = '',
  email: email_address = '',
  firstName = '',
  lastName = '',
  phone: national_number = '',
  postalCode: postal_code = '',
  state: admin_area_1 = '',
}) => {
  const shippingPaypal = {
    name: { full_name: `${firstName} ${lastName}` },
    email_address,
    phone_number: { national_number },
    type: 'SHIPPING',
    address: {
      address_line_1,
      address_line_2,
      admin_area_2,
      admin_area_1,
      postal_code,
      country_code,
    },
  };

  return shippingPaypal;
};

export const getOrderPayPal: GetOrderPayPal = (
  products,
  userInfo,
  discount,
) => {
  const totalPrice = products.reduce(
    (count, { _sale_price }) => count + Number(_sale_price),
    0,
  );

  const { newTotalPrice, totalDiscount } = formatCoupon(discount, totalPrice);

  const items = products.map(
    ({ post_title: name = '', _sale_price: value = '' }) => ({
      name,
      unit_amount: {
        currency_code: CURRENCY_CODE,
        value,
      },
      quantity: '1',
      category: 'PHYSICAL_GOODS' as 'PHYSICAL_GOODS',
    }),
  );

  const shipping = getAddressPayPal(userInfo);

  const order = {
    application_context: {
      shipping_preference: 'SET_PROVIDED_ADDRESS' as 'SET_PROVIDED_ADDRESS',
    },
    purchase_units: [
      {
        description: 'Achat Rebound',
        amount: {
          value: String(newTotalPrice),
          breakdown: {
            item_total: {
              currency_code: CURRENCY_CODE,
              value: String(totalPrice),
            },
            shipping: { currency_code: CURRENCY_CODE, value: '0' },
            tax_total: { currency_code: CURRENCY_CODE, value: '0' },
            discount: {
              currency_code: CURRENCY_CODE,
              value: totalDiscount,
            },
          },
        },
        items,
        shipping,
      },
    ],
  };

  return order;
};

export const getAddressWP: GetAddressWP = ({
  address: address_1 = '',
  addressDetails: address_2 = '',
  city = '',
  country = '',
  email = '',
  firstName: first_name = '',
  lastName: last_name = '',
  phone = '',
  postalCode: postcode = '',
  state = '',
}) => {
  const shipping = {
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    state,
    postcode,
    country,
  };

  const billing = {
    ...shipping,
    email,
    phone,
  };

  return { shipping, billing };
};

export const getOrderWP: GetOrderWP = (
  products,
  userInfo,
  discount,
  paymentMethod,
) => {
  const line_items = products.map(({ ID = 0, _sale_price = '' }) => ({
    product_id: ID,
    quantity: 1,
    total: _sale_price,
  }));

  const { shipping, billing } = getAddressWP(userInfo);

  const coupon_lines = discount?.code ? [{ code: discount?.code }] : [];

  let payment_method_title;

  switch (paymentMethod) {
    case 'paypal':
      payment_method_title = 'PayPal';
      break;

    case 'card':
      payment_method_title = 'CB';

      break;

    default:
      payment_method_title = 'source iconnu';

      break;
  }

  const order = {
    status: 'completed',
    payment_method: paymentMethod || '',
    payment_method_title,
    set_paid: true,
    billing,
    shipping,
    line_items,
    coupon_lines,
  };

  return order;
};
