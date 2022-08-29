import React, { FC } from 'react';
import styled, { AppStyledProps } from 'styled-components';
import tw from 'twin.macro';

import { ElementProps } from '../../types/html';

const ListItemStyles = styled.li<AppStyledProps>(({ $styles }) => [
  tw`list-none`,
  $styles,
]);

const ListItem: FC<ElementProps> = ({ children, styles, ...otherProps }) => (
  <ListItemStyles $styles={styles} {...otherProps}>
    {children}
  </ListItemStyles>
);

export default ListItem;
