import { CSSProperties, JSXElementConstructor } from 'react';
import { AppStyled } from 'styled-components';

export interface SpinnerProps {
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
  size?: number | string;
  styles?: AppStyled;
  Spinner?: JSXElementConstructor;
}
