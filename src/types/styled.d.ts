import { FlattenSimpleInterpolation } from 'styled-components';
import { TwStyle } from 'twin.macro';

import { LOGO_CART, LOGO_QUANTITY } from '../constants/constants';
import { PAGE } from './containers';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: TwStyle;
    borderColor: TwStyle;
    buttonColor: TwStyle;
    textColor: TwStyle;
    themeBanner?: string;
    themeFilter?: string;
  }

  export type AppStyled =
    | TwStyle
    | TwStyle[]
    | FlattenSimpleInterpolation
    | FlattenSimpleInterpolation[];

  export interface AppStyledProps {
    $styles?: AppStyled;
  }

  export interface ModalStylesProps extends AppStyledProps {
    $modalStyles: AppStyled;
  }

  export interface ModalStyledProps {
    $page?: PAGE;
  }

  export interface ProductStyledProps extends ModalStyledProps {
    $isNew?: string | boolean;
    $isPodium?: boolean;
  }

  export interface ModalButtonStyledProps extends ModalStyledProps {
    $stateShowCart?: boolean;
  }

  export type IMAGE = typeof LOGO_CART | typeof LOGO_QUANTITY;
  export interface ModalImageStyledProps extends ModalStyledProps {
    $logo?: IMAGE;
  }

  export interface PodiumStyledProps extends AppStyledProps {
    $podium?: string;
  }
}
