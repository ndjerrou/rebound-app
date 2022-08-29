import { Dispatch, SetStateAction } from 'react';

import { ModalCartProps } from './components';

export interface FilterShopCategoryProps extends Products {
  stateModal?: State<boolean>;
  rarity?: Term;
}

export interface CartProps extends ModalCartProps, AppStylesProps {
  setShowCart?: Dispatch<SetStateAction<boolean>>;
}

export interface ProductDetailsProps {
  setShowInformation?: Dispatch<SetStateAction<boolean>>;
  item: Product;
}
