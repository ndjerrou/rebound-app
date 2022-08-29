import React, { FC, MouseEventHandler, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

import { Button, Container, Separator, Text } from '../../components/html';
import { CartContext } from '../../contexts';
import { pluralize } from '../../utilities/functions';

import { CartProps } from '../../types/containers';
import { CarouselCart } from '../../components/carousel';

const textQuantityStyles = tw`!text-white !text-[.7rem] !leading-5`;

const TitleCartStyles = styled.h1`
  ${tw`text-white my-0`}
`;

const ButtonPay = styled(Button)`
  ${tw`rounded-full bg-white hover:bg-white/95 active:bg-white/95 text-lg text-blue-rb-800 font-rb-akira-sup w-48 h-[3.5rem] self-center mt-12 mr-5`}
`;

const SeparatorStyled = styled(Separator)`
  ${tw`w-[96%] !h-[1px] mb-4 ml--2`}
`;

const PriceStyled = styled(Container)`
  ${tw`flex justify-between ml-2 mr-10`}
  & span {
    ${tw`!text-white`}
  }
`;

const Cart: FC<CartProps> = ({ setShowCart, ...otherProps }) => {
  const { cart, totalPrice } = useContext(CartContext);

  const navigate = useNavigate();

  const cartQuantity = pluralize(cart.length, 'article');

  const handleClick: MouseEventHandler = () => navigate('/checkout');

  return (
    <Container {...otherProps}>
      <TitleCartStyles>Ta Box</TitleCartStyles>
      <Text styles={textQuantityStyles}>{cartQuantity}</Text>
      <SeparatorStyled />
      <CarouselCart page setShowCart={setShowCart} />
      <SeparatorStyled />
      <PriceStyled>
        <Text>Total</Text>
        <Text>{totalPrice}€</Text>
      </PriceStyled>
      <ButtonPay onClick={handleClick}>Payer</ButtonPay>
    </Container>
  );
};

export default Cart;
