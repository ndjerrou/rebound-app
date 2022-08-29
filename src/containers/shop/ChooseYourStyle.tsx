import React, { FC, useContext } from 'react';
import tw from 'twin.macro';
import styled, { css } from 'styled-components';

import { Button, Container } from '../../components/html';
import StyleImage from '../../components/StyleImage';

import arrow from '../../assets/images/global/fleche.png';

import '../../assets/css/ChoseYourStyle.css';
import { CartContext } from '../../contexts';
import { Carousel } from '../../components/carousel';

const rotate90 = css`
  transform: rotate(90deg);
`;

const rotate270 = css`
  transform: rotate(-90deg);
`;

const arrowStyles = tw`!w-10 absolute top-[12.5rem] !pointer-events-auto cursor-pointer z-10`;

const arrowPrevStyles = [rotate270, arrowStyles, tw`left-[35rem]`];

const arrowNextStyles = [rotate90, arrowStyles, tw`right-[35rem]`];

const StepHeader = styled.h2`
  font-family: Akira Super;
  font-size: 51px;
  color: #000000;
  margin: 0.2em;
`;

const StepDescription = styled.p`
  font-family: Swis721BlkExBT;
  text-transform: uppercase;
  font-size: 16px;
  color: #000000;
  margin: 0.2em;
`;

const StepContainer = styled.div`
  margin-left: 2em;
`;

const ChooseYourStyle: FC = () => {
  const {
    products: { terms: { productCat = [] } = {} },
  } = rbData;

  const { cart } = useContext(CartContext);

  const buttonStyles = [
    tw`h-14 text-[1.1rem] mr-8 relative`,
    css`
      transition: transform 200ms;
    `,
  ];

  const isEmptyCart = cart.length === 0;

  !isEmptyCart &&
    buttonStyles.push(css`
      transform: translateX(-6rem);
    `);

  return (
    <>
      <Container styles={tw`flex p-10 justify-between`}>
        <Container styles={tw`flex items-center`}>
          <StepHeader style={{ fontSize: '52px' }}>1</StepHeader>
          <StepContainer>
            <StepHeader style={{ fontSize: '33px' }}>
              Choisis ton style !
            </StepHeader>
            <StepDescription style={{ fontFamily: 'Swis721BlkExBT' }}>
              fais defiler et choisis ton style!
            </StepDescription>
          </StepContainer>
        </Container>
        <Button isBack styles={buttonStyles}>
          Retour
        </Button>
      </Container>
      <Carousel
        arrowPrev={arrow}
        arrowPrevStyles={arrowPrevStyles}
        arrowNext={arrow}
        arrowNextStyles={arrowNextStyles}
        infiniteLoop
        centerMode
        centerSlidePercentage={33.3}
      >
        {productCat.map(({ slug = '', thumbnail_id: { src = '' } = {} }) => (
          <StyleImage
            key={src}
            image={src}
            slug={slug}
            to={`/shop/${slug}/products`}
          />
        ))}
      </Carousel>
    </>
  );
};

export default ChooseYourStyle;
