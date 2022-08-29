import React, { FC } from 'react';
import styled, { AppStyledProps } from 'styled-components';
import tw from 'twin.macro';

import { ElementProps } from '../../types/html';

interface TextProps extends ElementProps {
  customColor?: string;
  customFont?: string;
  customMargin?: string;
}

const TextStyles = styled.span<AppStyledProps>(({ $styles }) => [
  tw`uppercase`,
  $styles,
]);

const Text: FC<TextProps> = ({
  children,
  onClick,
  styles,
  customColor,
  customFont = 'Akira Expanded',
  customMargin,
}) => (
  <TextStyles
    style={{
      color: `${customColor}`,
      fontFamily: `${customFont}`,
      margin: `${customMargin}`,
    }}
    $styles={styles}
    onClick={onClick}
  >
    {children}
  </TextStyles>
);

export default Text;
