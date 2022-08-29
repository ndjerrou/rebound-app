import {
  ChangeEventHandler,
  CSSProperties,
  FC,
  FocusEventHandler,
  ForwardedRef,
  HTMLInputTypeAttribute,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';
import {
  FixedSizeListProps,
  ListProps,
  VariableSizeListProps,
} from 'react-window';
import { AppStyledProps, AppStyled } from 'styled-components';

export interface ElementProps extends AppStylesProps, AppStyledProps {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
}

export interface ButtonProps extends ElementProps {
  isBack?: boolean;
}

export interface ButtonStyledProps extends AppStyledProps {
  $isBack?: boolean;
}

export interface ImageProps extends ElementProps {
  backgroundStyles?: boolean;
  containerStyles?: AppStyled;
  height?: string | number;
  href?: string;
  maxWidth?: string | number;
  maxHeight?: string | number;
  src?: string;
  textStyles?: AppStyled;
  to?: string;
  width?: string | number;
  withContainer?: boolean;
  ref: ForwardedRef<HTMLImageElement>;
}

export interface ImageStyledProps extends ImageProps {
  $backgroundStyles?: boolean;
}

export interface InputProps extends ElementProps {
  name?: HTMLInputTypeAttribute;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  value?: HTMLInputTypeAttribute;
  placeholder?: HTMLInputTypeAttribute;
  min?: HTMLInputTypeAttribute;
  max?: HTMLInputTypeAttribute;
  step?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  target?: Element;
}

export interface LinkProps extends ElementProps {
  href?: string;
  target?: string;
  to?: string;
}

export interface ListStyledProps extends FixedSizeListProps, AppStyledProps {}

export interface ListVariableStyledProps
  extends VariableSizeListProps,
    AppStyledProps {}

export interface PickerItemRarityProps {
  data?: Term;
  name: string;
}

export interface ListAppProps<T, U> extends ListProps, AppStyledProps {
  children: ReactElement;
  containerStyles?: AppStyled;
  ListType?: FC<T | U>;
  itemSize: T<never> | U<never>;
  // itemSize: (U | T)['itemSize'];
  // itemSize: T['itemSize'] | U['itemSize'];
}
