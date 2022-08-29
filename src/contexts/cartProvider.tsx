import React, { useMemo, useState, useEffect, FC } from 'react';
import { toast } from 'react-toastify';

import { CartContext } from '.';
import { getCoupon } from '../api/coupons';
import { createOrder } from '../api/orders';
import useApi from '../hooks/useApi';

const CartProvider: FC<CartContextProps> = ({ children }) => {
  const localCart = JSON.parse(
    localStorage.getItem('cart') || '[]',
  ) as Product[];

  const localDiscount = JSON.parse(localStorage.getItem('discount') || '{}');

  const createOrderApi = useApi(createOrder);

  const [products, setProducts] = useState<Product[]>(localCart);

  const [discount, setDiscount] = useState<Discount>(localDiscount);

  const totalPrice = products.reduce(
    (count, product) => count + Number(product._sale_price),
    0,
  );

  const addProductToCart: AddProductToCart<Product> = (product) =>
    products.length < 9
      ? setProducts([...products, product])
      : toast('Votre panier est plein !');

  const removeProductFromCart: RemoveProductToCart<Product> = (product) => {
    const newProducts = products.filter((p) => p.ID !== product.ID);

    setProducts(newProducts);
  };

  const getDiscount: GetDiscount = async (coupon) => {
    const result = await getCoupon(coupon);

    console.log(result);

    if (
      Array.isArray(result.data) &&
      result.data.at(0)?.discount_type === 'fixed_product'
    )
      return { ...result, data: [] };

    if (result.ok && Array.isArray(result.data) && result.data.length === 1) {
      const formatCoupons: Discount[] = result.data.map(
        ({
          amount = '',
          discount_type,
          usage_count = 1,
          usage_limit = 1,
        }: Discount) => ({
          amount,
          code: coupon,
          discount_type,
          usage_count,
          usage_limit,
        }),
      );

      const validateCoupon = formatCoupons.at(0) as Discount;

      validateCoupon && setDiscount(validateCoupon);
    }

    return result;
  };

  const contextValue = useMemo(
    () => ({
      cart: products,
      createOrderApi,
      discount,
      totalPrice,
      addProductToCart,
      getDiscount,
      removeProductFromCart,
    }),
    [products, discount, createOrderApi],
  );

  useEffect(() => {
    localStorage.setItem('discount', JSON.stringify(discount));
  }, [discount]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
