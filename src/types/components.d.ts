import {
  Dispatch,
  ForwardedRef,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react';
import { AppStyled } from 'styled-components';

import { ElementProps } from './html';
import { PAGE_CHECKOUT, PAGE_PRODUCT, PAGE_SHOP } from '../constants/constants';

export interface CarouselProps extends AppStylesProps {
  arrowNext?: string;
  arrowNextStyles?: AppStyled;
  arrowPrev?: string;
  arrowPrevStyles?: AppStyled;
  centerMode?: boolean;
  centerSlidePercentage?: number;
  children?: ReactNode;
  infiniteLoop?: boolean;
  onClickItem?: (index: number, item: ReactNode) => void;
  selectedItem?: number;
  width?: number | string;
}

export type RenderArrowCarouselProps = (
  clickHandler: () => void,
  hasPrevOrNext: boolean,
  arrowStyles?: AppStyled,
  src?: string,
) => ReactNode;

export interface CampaignHeadersProps {
  title: string;
  blurb: string | ReactElement;
  cta: string;
  customRef?: ForwardedRef<HTMLDivElement>;
}

export type PAGE =
  | typeof PAGE_CHECKOUT
  | typeof PAGE_PRODUCT
  | typeof PAGE_SHOP
  | boolean;

export interface ModalCartProps {
  page?: PAGE;
}

export interface ModalButtonProps extends ModalCartProps {
  stateShowCart?: boolean;
  setShowCart?: Dispatch<SetStateAction<boolean>>;
}

export interface ProductProps {
  category?: string;
  id?: number;
  image?: string;
  isNew?: string;
  page?: PAGE;
  podium?: Term;
  price?: string;
  rarety?: string;
  title?: string;
  showBenef?: boolean;
  showPodium?: boolean;
  isPodium?: boolean;
}

export interface PickerRarityProps {
  description?: string;
  slug?: string;
  src?: string;
}

export interface ModalProps extends ElementProps {
  id?: string;
}

export interface ModalGetProductInfoProps {
  stateModal?: State<boolean>;
  title?: string;
}
