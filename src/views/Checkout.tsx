import React, { FC, useContext } from 'react';
import RingLoader from 'react-spinners/RingLoader';
import styled from 'styled-components';
import tw from 'twin.macro';

import { Container, Separator } from '../components/html';
import FormCheckout from '../containers/checkout/FormCheckout';
import CartCheckout from '../containers/checkout/CartCheckout';
import Spinner from '../components/Spinner';
import { Modal } from '../components/modal';
import { CartContext } from '../contexts';

const SeparatorVertical = styled(Separator)`
  ${tw`w-[2px] h-[85%] mt-12`}
`;

const Checkout: FC = () => {
  const {
    createOrderApi: { loading },
  } = useContext(CartContext);

  const modalStyles = [tw`flex justify-center items-center bg-white/80 z-20`];

  return (
    <Container styles={tw`flex w-screen h-screen`}>
      {loading && (
        <Modal id="spinner-root" styles={modalStyles}>
          <Spinner size={120} Spinner={RingLoader} />
        </Modal>
      )}
      <FormCheckout />
      <SeparatorVertical />
      <CartCheckout />
    </Container>
  );
};

export default Checkout;
