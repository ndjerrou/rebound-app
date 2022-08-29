import React, { FC, useContext } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import { css } from 'styled-components';
import { Button, Container, Image } from '../components/html';

import background from '../assets/images/global/gros_logo_en_arriere_plan.png';
import { CartContext } from '../contexts';

const styles = tw`flex justify-between sm:mx-20 h-36`;
const logoStyles = tw`w-44 h-[8.5rem] relative top-12 right-7 z-10`;
const productsStyles = tw`absolute top--12 left-[-34rem] w-[85rem]`;

const BackgroundImage: FC = () => {
  const location = useLocation();

  const { category, id } = useParams();

  const path =
    location.pathname === `/shop/${category}/products/${id}` || String();

  return path ? (
    <Image styles={productsStyles} src={background} />
  ) : (
    <Image backgroundStyles src={background} />
  );
};

const MainLayout: FC = () => {
  const { cart } = useContext(CartContext);

  const isEmptyCart = cart.length === 0;

  const modalStyles = isEmptyCart
    ? css`
        transform: translateX(0rem);
        transition: transform 200ms;
      `
    : css`
        transform: translateX(-6rem);
        transition: transform 200ms;
      `;

  return (
    <>
      <Container styles={styles}>
        <Image styles={logoStyles} to="/" />
        <Button
          isBack
          styles={[tw`w-32 h-12 mt-12 top-[3.4rem] mr--4`, modalStyles]}
        >
          Retour
        </Button>
      </Container>
      <BackgroundImage />
      <Outlet />
    </>
  );
};

export default MainLayout;
