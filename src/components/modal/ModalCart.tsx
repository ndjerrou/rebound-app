import React, { FC, useContext, useState } from 'react';

import { AppStyled, css } from 'styled-components';
import tw from 'twin.macro';

import { Modal, ModalButton } from '.';
import { Text } from '../html';
import { PAGE_SHOP } from '../../constants/constants';
import Cart from '../../containers/cart/Cart';
import { CartContext } from '../../contexts';
import { ModalCartProps } from '../../types/components';
import { pluralize } from '../../utilities/functions';

const ModalCart: FC<ModalCartProps> = ({ page }) => {
  const { cart } = useContext(CartContext);

  const [stateShowCart, setShowCart] = useState<boolean>(false);

  const isEmptyCart = cart.length === 0;

  const modalStyles: AppStyled[] = isEmptyCart
    ? [tw`opacity-0`]
    : [tw`opacity-100`];

  modalStyles.push(css`
    transition: opacity 500ms, z-index 500ms;
  `);

  const cartStyles: AppStyled[] = [
    tw`w-[32%] pt-12 px-10 bg-blue-rb-800 rounded-[72px] flex flex-col absolute`,
    css`
      transition: transform 200ms;
    `,
  ];

  if (stateShowCart) {
    modalStyles.push(tw`bg-white/40 z-20`);
    cartStyles.push([
      tw`top--4`,
      css`
        transform: translateX(-27rem);
      `,
    ]);
  }

  const cartQuantityStyles = [
    tw`!text-blue-rb-800 !text-[.7rem] !leading-5 absolute`,
  ];

  if (page === PAGE_SHOP) {
    cartQuantityStyles.push(tw`top-[20.5rem] right-10`);

    cartStyles.push(tw`right-[-31rem] h-[42rem]`);
  } else {
    cartQuantityStyles.push(tw`top-[7.5rem] right-14`);

    cartStyles.push(tw`right-[-29rem] h-[62rem]`);
  }

  const cartQuantity = pluralize(cart.length, 'article');

  return (
    <Modal id="cart-root" styles={modalStyles}>
      <ModalButton
        page={page}
        stateShowCart={stateShowCart}
        setShowCart={setShowCart}
      />
      {!stateShowCart && (
        <Text styles={cartQuantityStyles}>{cartQuantity}</Text>
      )}
      <Cart setShowCart={setShowCart} styles={cartStyles} />
    </Modal>
  );
};

export default ModalCart;
