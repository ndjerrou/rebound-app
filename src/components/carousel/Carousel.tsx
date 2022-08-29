import React, {
  Children,
  cloneElement,
  FC,
  ReactElement,
  ReactNode,
} from 'react';
import { Carousel as CarouselRRC } from 'react-responsive-carousel';
import styled, { AppStyled, AppStyledProps } from 'styled-components';
import tw from 'twin.macro';

import { Container, Image } from '../html';

import {
  CarouselProps,
  RenderArrowCarouselProps,
} from '../../types/components';

const CarouselStyles = styled(CarouselRRC)<AppStyledProps>`
  && .slider-wrapper {
    ${({ $styles }): AppStyled | undefined => $styles}
  }

  && .carousel {
    ${tw`hidden`}
  }

  && .carousel.carousel-slider {
    ${tw`block`}
  }
`;

const carouselContainerStyles = tw`flex justify-center w-full`;

const Carousel: FC<CarouselProps> = ({
  styles,
  children,
  arrowPrev,
  arrowPrevStyles,
  arrowNext,
  arrowNextStyles,
  ...otherProps
}): ReactElement => {
  const renderArrow: RenderArrowCarouselProps = (
    clickHandler,
    hasPrevOrNext,
    arrowStyles,
    src,
  ) =>
    hasPrevOrNext && (
      <Image onClick={clickHandler} src={src} styles={arrowStyles} />
    );

  return Array.isArray(children) ? (
    <CarouselStyles
      $styles={styles}
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      renderArrowPrev={(clickHandler, hasPrev): ReactNode =>
        renderArrow(clickHandler, hasPrev, arrowPrevStyles, arrowPrev)
      }
      renderArrowNext={(clickHandler, hasNext): ReactNode =>
        renderArrow(clickHandler, hasNext, arrowNextStyles, arrowNext)
      }
      {...otherProps}
    >
      {Children.map(children, (child) => (
        <Container styles={carouselContainerStyles} key={child.id}>
          {cloneElement(child)}
        </Container>
      ))}
    </CarouselStyles>
  ) : (
    <Container styles={carouselContainerStyles}>{children}</Container>
  );
};

export default Carousel;
