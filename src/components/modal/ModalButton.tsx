import React, { FC, useContext } from 'react';

import { ButtonStyled, ImageStyled } from './styled';
import { LOGO_CART, LOGO_QUANTITY } from '../../constants/constants';
import { CartContext } from '../../contexts';
import { ModalButtonProps } from '../../types/components';
import { getImageCartQuantity } from '../../utilities/cart';

import logoCart from '../../assets/images/cart/logo_ca.png';

const ModalButton: FC<ModalButtonProps> = ({
  stateShowCart,
  page,
  setShowCart,
}) => {
  const { cart } = useContext(CartContext);

  const logoCartQuantity = getImageCartQuantity(cart.length);

  const handleCart = (): void => setShowCart && setShowCart(!stateShowCart);

  return (
    <ButtonStyled
      $page={page}
      $stateShowCart={stateShowCart}
      onClick={handleCart}
    >
      {stateShowCart ? (
        'x'
      ) : (
        <>
          <ImageStyled $logo={LOGO_CART} $page={page} src={logoCart} />
          <ImageStyled
            $logo={LOGO_QUANTITY}
            $page={page}
            src={logoCartQuantity}
          />
        </>
      )}
    </ButtonStyled>
  );
};

export default ModalButton;
