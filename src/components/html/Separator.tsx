import React, { FC } from 'react';
import tw from 'twin.macro';

import { Container } from '.';
import { ElementProps } from '../../types/html';

const separatorStyles = tw`h-[2px] bg-gray-rb-600`;

const Separator: FC<ElementProps> = ({ styles, ...otherProps }) => (
  <Container styles={[separatorStyles, styles]} {...otherProps} />
);

export default Separator;
