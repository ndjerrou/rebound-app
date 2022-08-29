import React, { FC } from 'react';
import styled, { AppStyled, AppStyledProps } from 'styled-components';

import { SpinnerProps } from '../types/spinner';

const CloneSpinner: FC<SpinnerProps> = ({ Spinner, ...otherProps }) => (
  <Spinner {...otherProps} />
);

const CloneSpinnerStyled = styled(CloneSpinner)<AppStyledProps>`
  & span {
    ${({ theme: { borderColor }, $styles }): AppStyled => [
      borderColor,
      $styles,
    ]};
  }
`;

const Spinner: FC<SpinnerProps> = ({
  Spinner: spinner,
  styles,
  ...otherProps
}) => <CloneSpinnerStyled $styles={styles} Spinner={spinner} {...otherProps} />;

export default Spinner;
