import {
  CreateOrderRequestBody,
  PayPalButtonsComponentOptions,
} from '@paypal/paypal-js';
import { OnApprove, PayPalButtons } from '@paypal/react-paypal-js';
import { FormikContextType, FormikValues, useFormikContext } from 'formik';
import React, { ReactElement, useContext } from 'react';
import { toast } from 'react-toastify';
import tw from 'twin.macro';

import { ErrorMessage } from '.';
import { CartContext } from '../../contexts';
import { getOrderPayPal, getOrderWP } from '../../utilities/order';
import { scrollTo } from '../../utilities/functions';

const PayPalSubmitButton = (): ReactElement => {
  const { cart, discount, createOrderApi } = useContext(CartContext);

  const {
    dirty,
    isValid,
    values: form,
  }: FormikContextType<FormikValues> = useFormikContext();

  const orderPayPal = getOrderPayPal(cart, form, discount);

  const handleCreate: PayPalButtonsComponentOptions['createOrder'] = (
    data,
    actions,
  ) => actions.order.create(orderPayPal as CreateOrderRequestBody);

  const handleApprove: OnApprove = async (data, actions) => {
    await actions.order?.capture();

    const orderWP = getOrderWP(
      cart,
      form,
      discount,
      data?.paymentSource || 'inconnu',
    );

    const result = await createOrderApi.request(orderWP);

    console.log(result);

    result.ok
      ? toast('Achat effectue!')
      : toast(
          "Votre paiement a ete traite avec succes. Cependant, nous ne sommes pas en mesure d'honorer votre achat. Veuillez nous contacter a l'adresse support@designcode.io pour obtenir de l'aide.",
        );
  };

  const handleCancel: PayPalButtonsComponentOptions['onCancel'] = () =>
    toast("Operation annulee et aucun paiement n'a ete effectue!");

  const handleClick: PayPalButtonsComponentOptions['onClick'] = async (
    data,
    actions,
  ) => {
    setTimeout(() => {
      scrollTo('bottom');
    }, 2000);

    return isValid ? actions.resolve() : actions.reject();
  };

  const handleError: PayPalButtonsComponentOptions['onError'] = () =>
    toast("Une erreur est survenue et aucun paiement n'a ete effectue!");

  const handleInit: PayPalButtonsComponentOptions['onInit'] = () =>
    scrollTo('bottom');

  const style: PayPalButtonsComponentOptions['style'] = {
    color: 'silver',
    height: 48,
    tagline: false,
    shape: 'pill',
  };

  return dirty && isValid ? (
    <PayPalButtons
      createOrder={handleCreate}
      onApprove={handleApprove}
      onCancel={handleCancel}
      onClick={handleClick}
      onError={handleError}
      onInit={handleInit}
      style={style}
    />
  ) : (
    <ErrorMessage
      error="Veuillez remplir le formulaire pour proceder au paiement"
      styles={tw`flex text-center`}
      visible
    />
  );
};

export default PayPalSubmitButton;
