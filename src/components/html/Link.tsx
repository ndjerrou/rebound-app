import React, { FC } from 'react';
import { Link as LinkDOM } from 'react-router-dom';
import styled, { AppStyledProps } from 'styled-components';
import tw from 'twin.macro';

import { LinkProps } from '../../types/html';

const linkDefaultStyles = tw`no-underline focus-visible:outline-none`;

const LinkStyles = styled.a<AppStyledProps>(({ $styles }) => [
  linkDefaultStyles,
  $styles,
]);

const LinkDOMStyles = styled(LinkDOM)<AppStyledProps>(({ $styles }) => [
  linkDefaultStyles,
  $styles,
]);

const Link: FC<LinkProps> = ({ children, href, styles, to, ...otherProps }) => {
  if (to)
    return (
      <LinkDOMStyles to={to} $styles={styles} {...otherProps}>
        {children}
      </LinkDOMStyles>
    );

  if (href)
    return (
      <LinkStyles href={href} $styles={styles} {...otherProps}>
        {children}
      </LinkStyles>
    );

  return <>{children}</>;
};

export default Link;
