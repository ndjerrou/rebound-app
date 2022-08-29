import React, { FC } from 'react';
import styled, { AppStyledProps } from 'styled-components';
import tw from 'twin.macro';

import { ElementProps } from '../../types/html';

const LabelStyles = styled.label<AppStyledProps>(({ $styles }) => [
  tw`text-black font-rb-swis`,
  $styles,
]);

const Label: FC<ElementProps> = ({ children, styles, ...otherProps }) => (
  <LabelStyles $styles={styles} {...otherProps}>
    {children}
  </LabelStyles>
);

export default Label;
