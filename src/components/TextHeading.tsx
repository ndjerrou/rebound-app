import { Text as TextUI } from 'evergreen-ui';
import React, { FC } from 'react';
import styled from 'styled-components';

import { ElementProps } from '../types/html';

const TextStyles = styled(TextUI)(({ $textStyles }) => [
  $textStyles && $textStyles,
]);

const TextHeading: FC<ElementProps> = ({ children, onClick, styles }) => (
  <TextStyles
    style={{
      textShadow: '0px 0px 13px #FFFFFF',
      fontFamily: 'Swiss 721 BLKEXBT',
    }}
    $textStyles={styles}
    onClick={onClick}
  >
    {children}
  </TextStyles>
);

export default TextHeading;
