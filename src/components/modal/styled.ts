import styled, {
  css,
  ModalButtonStyledProps,
  ModalStylesProps,
  ModalImageStyledProps,
} from 'styled-components';
import tw from 'twin.macro';

import { Button, Container, Image } from '../html';
import {
  PAGE_CHECKOUT,
  PAGE_SHOP,
  PAGE_PRODUCT,
  LOGO_CART,
  LOGO_QUANTITY,
} from '../../constants/constants';

export const ModalStyles = styled(Container)<ModalStylesProps>(
  ({ $modalStyles, $styles }) => [
    tw`w-full absolute top-0 left-0 overflow-hidden`,
    $modalStyles,
    $styles,
  ],
);

export const ButtonStyled = styled(Button)<ModalButtonStyledProps>(
  ({ $stateShowCart, $page, theme: { buttonColor } }) => [
    css`
      transition: transform 200ms;
    `,
    $stateShowCart && [
      css`
        transform: translateX(-27rem);
      `,
      buttonColor,
    ],
    !$stateShowCart &&
      tw`bg-white hover:bg-white/95 active:bg-white/95 overflow-hidden`,
    tw`absolute rounded-[2rem] border-none text-xl`,
    ($page === PAGE_SHOP || $page === PAGE_PRODUCT) &&
      tw`w-[4.5rem] h-[5.75rem] top-6 right-14`,
    $page === PAGE_CHECKOUT &&
      tw`w-[5.3rem] h-[6.9rem] top-4 right-[6.5rem] cursor-auto`,
    $page === PAGE_SHOP &&
      !$stateShowCart &&
      tw`w-28 h-32 top-[12.5rem] right-6`,
  ],
);

export const ImageStyled = styled(Image)<ModalImageStyledProps>(
  ({ $logo, $page }) => [
    tw`absolute`,
    $logo === LOGO_CART && $page === PAGE_SHOP && tw`w-60`,
    $logo === LOGO_CART && $page === PAGE_PRODUCT && tw`w-48`,
    $logo === LOGO_CART && $page === PAGE_CHECKOUT && tw`w-52`,
    $logo === LOGO_QUANTITY && $page === PAGE_SHOP && tw`top-6 left-0 w-24`,
    $logo === LOGO_QUANTITY &&
      $page === PAGE_PRODUCT &&
      tw`top-5 left--0.5 w-16`,
    $logo === LOGO_QUANTITY &&
      $page === PAGE_CHECKOUT &&
      tw`top-[1.4rem] left-[-.2rem] w-20`,
  ],
);
