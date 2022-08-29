import { Pane } from 'evergreen-ui';
import React, { FC, ForwardRefRenderFunction } from 'react';
import styled, { AppStyled, AppStyledProps } from 'styled-components';
import tw from 'twin.macro';

import { ElementProps } from '../../types/html';

const ContainerStyles = styled(Pane)<AppStyledProps>`
  ${tw`text-gray-rb-800 text-sm md:text-base lg:text-xl font-rb-akira-exp z-0`}

  ${({ $styles }): AppStyled | undefined => $styles}

  & h1 {
    ${tw`text-lg md:text-xl lg:text-3xl font-rb-akira-exp z-0`}
  }

  & h2 {
    ${tw`text-base md:text-lg lg:text-2xl font-rb-akira-exp z-0`}
  }

  & h3 {
    ${tw`text-sm md:text-base lg:text-xl font-rb-akira-exp z-0`}
  }

  & h4 {
    ${tw`text-xs md:text-sm lg:text-lg font-rb-akira-exp z-0`}
  }

  & p {
    ${tw`text-black text-sm font-rb-akira-exp`}
  }

  & span {
    ${tw`text-black text-xl font-rb-akira-exp`}
  }
  /*
  & a {
    ${tw`no-underline`}
  } */
`;

const Container: ForwardRefRenderFunction<HTMLDivElement, ElementProps> = (
  { children, styles, ...otherProps },
  ref,
) => (
  <ContainerStyles ref={ref} {...otherProps} $styles={styles}>
    {children}
  </ContainerStyles>
);

// const Container: FC<ElementProps> = ({ children, styles, ...otherProps }) => (
//   <ContainerStyles {...otherProps} $styles={styles}>
//     {children}
//   </ContainerStyles>
// );

export default React.forwardRef<HTMLDivElement, ElementProps>(Container);
// export default Container;
