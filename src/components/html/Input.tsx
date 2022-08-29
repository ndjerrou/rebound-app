import React, { FC } from 'react';
import styled, { AppStyledProps } from 'styled-components';

import { InputProps } from '../../types/html';

const InputStyles = styled.input<AppStyledProps>(({ $styles }) => [$styles]);

const Input: FC<InputProps> = ({ styles, ...otherProps }) => (
  <InputStyles $styles={styles} {...otherProps} />
);

export default Input;
