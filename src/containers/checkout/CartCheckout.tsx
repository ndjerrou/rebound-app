import { FormikValues } from 'formik';
import React, { FC, useContext, useState } from 'react';
import RingLoader from 'react-spinners/RingLoader';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import tw from 'twin.macro';
import * as Yup from 'yup';

import { CarouselCart } from '../../components/carousel';
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../../components/forms';
import { Container, Image, Separator, Text } from '../../components/html';
import { ModalButton } from '../../components/modal';
import Spinner from '../../components/Spinner';
import { PAGE_CHECKOUT } from '../../constants/constants';
import { CartContext } from '../../contexts';
import useApi from '../../hooks/useApi';
import { formatCoupon } from '../../utilities/order';

const validationSchema = Yup.object().shape({
  coupon: Yup.string().required(``).min(1),
});

const CartCheckout: FC = () => {
  const { discount, totalPrice, getDiscount } = useContext(CartContext);

  const { backgroundColor, textColor } = useTheme();

  const couponApi = useApi(getDiscount);

  const [loginFailed, setLoginFailed] = useState(false);

  const [error, setError] = useState('');

  const { newTotalPrice, totalDiscount } = formatCoupon(discount, totalPrice);

  const formInitialValues = {
    coupon: '',
  };

  const handleSubmit = async (
    { coupon }: FormikValues,
    { resetForm }: FormikValues,
  ): Promise<void> => {
    setLoginFailed(false);

    const result = await couponApi.request(coupon);

    if (!result?.ok) {
      setError('Une erreur est surevenue');
      return setLoginFailed(true);
    }
    const cantUseCoupon =
      Number(discount?.usage_limit) - Number(discount?.usage_count) === 0;

    if (result?.data.length === 0) {
      setError(`Le code fourni n'existe pas ou plus`);
      return setLoginFailed(true);
    }

    if (discount?.usage_count && cantUseCoupon) {
      setError(`Le coupon n'est plus valide`);
      return setLoginFailed(true);
    }

    toast('Coupon applique avec succes !');

    return resetForm();
  };

  return (
    <Container styles={tw`w-1/2 h-full flex flex-col py-12 pl-20 mr-40`}>
      <Container styles={tw`flex pb-12`}>
        <Container styles={tw`flex flex-col w-full`}>
          <Text styles={[tw`!text-[1.75rem]`, textColor]}>Ta box</Text>
          <Separator
            styles={[tw`w-[82%] !h-[1px] mt-12 mb-4 ml--2`, backgroundColor]}
          />
        </Container>
        <ModalButton page={PAGE_CHECKOUT} />
      </Container>
      <CarouselCart page={PAGE_CHECKOUT} />
      <Form
        initialValues={formInitialValues}
        initialError={formInitialValues}
        isValid={false}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          styles={tw`self-center`}
          error={error}
          visible={loginFailed}
        />
        <Container styles={tw`flex self-center`}>
          <FormField
            inputStyles={tw`h-full rounded-lg ml-2`}
            labelStyles={[
              tw`border rounded-xl mr-2 pl-2 pb-1 font-rb-akira-sup text-white text-xs`,
              backgroundColor,
            ]}
            name="coupon"
            placeholder="Entrez un code promo"
          >
            Code Promo
          </FormField>
          {couponApi.loading ? (
            <Spinner
              loading={couponApi.loading}
              size={40}
              Spinner={RingLoader}
            />
          ) : (
            <SubmitButton
              styles={[
                tw`h-10 px-4 rounded-xl border-solid border text-[.5rem]`,
              ]}
              title="Appliquer"
            />
          )}
        </Container>
      </Form>
      {discount?.amount && (
        <>
          <Container styles={tw`flex w-full justify-between pl-40 pr-48 mt-4`}>
            <Text styles={[tw`!text-xs`, textColor]}>Sous-total</Text>
            <Text styles={[tw`!text-xs`, textColor]}>{totalPrice}</Text>
          </Container>
          <Container styles={tw`flex w-full justify-between pl-40 pr-48`}>
            <Text styles={[tw`!text-xs`, textColor]}>Promo</Text>
            <Text styles={[tw`!text-xs`, textColor]}>{totalDiscount}</Text>
          </Container>
        </>
      )}
      <Container styles={tw`flex w-full justify-between pl-40 pr-48 mt-4`}>
        <Text styles={[tw`!text-[1.75rem]`, textColor]}>Total</Text>
        <Text styles={[tw`!text-[1.75rem]`, textColor]}>
          {newTotalPrice}
          <Text styles={[tw`!text-[1.75rem] font-black`, textColor]}>€</Text>
        </Text>
      </Container>
      <Image styles={tw`w-36 absolute bottom-4 right-20`} />
    </Container>
  );
};

export default CartCheckout;
