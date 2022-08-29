import React, { ForwardRefRenderFunction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { Container, Link } from '.';
import Text from './Text';
import { ImageProps, ImageStyledProps } from '../../types/html';

import logo from '../../assets/images/global/logo_R_principale.png';

const ImageStyles = styled.img<ImageStyledProps>(
  ({ $backgroundStyles, $styles }) => [
    $backgroundStyles && tw`fixed top-[17rem] left-[-21rem] w-[957px] h-[804]`,
    $styles,
  ],
);

const TextStyles = styled(Text)`
  ${tw`flex justify-center`}
`;

const Image: ForwardRefRenderFunction<HTMLImageElement, ImageProps> = (
  {
    backgroundStyles,
    containerStyles,
    children,
    href,
    styles,
    onClick,
    src = logo,
    textStyles,
    to,
    width,
    maxWidth,
    height,
    maxHeight,
    withContainer = false,
    ...otherProps
  },
  ref,
) => {
  const Picture = (
    <ImageStyles
      $backgroundStyles={backgroundStyles}
      $styles={styles}
      onClick={onClick}
      src={src}
      width={width}
      height={height}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      ref={ref}
      {...(!withContainer && otherProps)}
    />
  );

  const IsText = children && (
    <TextStyles styles={textStyles}>{children}</TextStyles>
  );

  const IsLink =
    to || href ? (
      <Link href={href} to={to}>
        {Picture}
        {IsText}
      </Link>
    ) : (
      <>
        {Picture}
        {IsText}
      </>
    );

  return withContainer ? (
    <Container styles={containerStyles} {...otherProps}>
      {IsLink}
    </Container>
  ) : (
    IsLink
  );
};

export default React.forwardRef<HTMLImageElement, ImageProps>(Image);
