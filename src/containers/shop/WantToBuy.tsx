import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { Container, Image, Separator, Text } from '../../components/html';
import TextHeading from '../../components/TextHeading';

import arrow from '../../assets/images/global/fleche.png';
import logoWtb from '../../assets/images/global/icone_logo_wtb.png';
import backgroundPrice from '../../assets/images/global/icone_prix_wtb.png';
import social from '../../assets/images/global/twitter_wtb.png';
import email from '../../assets/images/global/mail_wtb.png';
import { Views } from '../../types/views';

const StepNumber = styled.h2`
  font-family: Akira Super;
  font-size: 51px;
  color: #000000;
  margin: 0.2em;
`;

const StepHeader = styled.h2`
  font-family: Akira Super;
  font-size: 40px !important;
  color: #000000;
  margin: 0.2em;
  width: max-content;
`;

const StepDescription = styled.p`
  font-family: Swis721BlkExBT;
  text-transform: uppercase;
  width: 428px;
  font-size: 16px;
  color: #000000;
  margin: 0.2em;
`;

const StepContainer = styled.div`
  margin-left: 2em;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DirectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: space-between;
  align-content: center;
  align-items: center;
  height: 90px;
`;

const ImageContainer = styled.div`
  align-content: right;
  height: 512px;
  width: 512px;
  margin: 0 auto;
  order: 2;
`;

const PriceImageContainer = styled.div`
  width: 290px;
  height: 90px;
`;

const PriceCaption = styled.div`
  position: absolute;
  width: 200px;
  line-height: 150px;
  text-align: center;
  margin: 0 auto;
  transform: translate(8px, -65px);
`;

const CarouselImageContainer = styled.div`
  height: 132px;
  width: 257px;
`;

const rotate90 = css`
  transform: rotate(90deg);
`;

const rotate270 = css`
  transform: rotate(-90deg);
`;

const arrowStyles = tw`cursor-pointer`;

const arrowPrevStyles = [rotate270, arrowStyles];

const arrowNextStyles = [rotate90, arrowStyles];

const WantToBuy: FC<Views> = ({ customRef }) => {
  const { wantToBuys } = rbData;

  const [productIndex, setProductIndex] = useState(0);
  const [{ _price, rb_cover }, setProduct] = useState(wantToBuys[productIndex]);

  const prevProduct = (): void => {
    if (productIndex > 0) {
      setProductIndex(productIndex - 1);
      setProduct(wantToBuys[productIndex - 1]);
    } else {
      setProductIndex(wantToBuys.length - 1);
      setProduct(wantToBuys[wantToBuys.length - 1]);
    }
  };

  const nextProduct = (): void => {
    if (productIndex < wantToBuys.length - 1) {
      setProductIndex(productIndex + 1);
      setProduct(wantToBuys[productIndex + 1]);
    } else {
      setProductIndex(0);
      setProduct(wantToBuys[productIndex * 0]);
    }
  };

  return (
    <Container ref={customRef} styles={tw`flex p-4 justify-between`}>
      <ContentContainer style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <StepNumber style={{ fontSize: '52px' }}>4</StepNumber>
          <StepContainer>
            <StepHeader>"Want To Buy"</StepHeader>
            <StepDescription style={{ fontFamily: 'Swis721BlkExBT' }}>
              Tu veux gagner de l'argent? <br /> voici les tees du mois que nous
              sommes prêts à t'acheter ! <br />
              Regarde nos offres et contacte nous !
            </StepDescription>
          </StepContainer>
        </div>
        <Container styles={tw`flex flex-col items-center justify-start mt-5`}>
          <CarouselImageContainer>
            <img
              alt=""
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
              src={rb_cover}
            />
          </CarouselImageContainer>
          <DirectionContainer>
            <Image
              onClick={prevProduct}
              src={arrow}
              styles={arrowPrevStyles}
              width={24}
            />
            <PriceImageContainer>
              <img
                alt=""
                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                src={backgroundPrice}
              />
              <PriceCaption>
                <TextHeading styles={tw`absolute !text-white !text-xl`}>
                  {_price}
                </TextHeading>
              </PriceCaption>
            </PriceImageContainer>
            <Image
              onClick={nextProduct}
              styles={arrowNextStyles}
              src={arrow}
              width={24}
            />
          </DirectionContainer>
          <Text customMargin="1em" styles={tw`!text-sm`}>
            {productIndex + 1}/{wantToBuys.length}
          </Text>
        </Container>
        <div style={{ marginLeft: '3em' }}>
          <Separator styles={tw`w-full h-[1px] bg-gray-rb-900 mt-2 mx-auto`} />
          <Container styles={tw`flex text-center justify-between m-2 px-2`}>
            <Text customFont="Akira Expanded" styles={tw`text-center `}>
              tu l'as?
              <br />
              Contacte nous
            </Text>
            <Container styles={tw`flex justify-around w-36`}>
              <Image src={social} width={52} />
              <Image src={email} width={52} />
            </Container>
          </Container>
        </div>
      </ContentContainer>
      <Image
        styles={css`
          position: relative;
          height: 8rem;
          order: 3;
          overflow: hidden;
          transform: translate(-15px, -50px);
          object-fit: 'cover';
        `}
        src={logoWtb}
      />
      <ImageContainer>
        <Image src={rb_cover} width={512} />
      </ImageContainer>
    </Container>
  );
};

export default WantToBuy;
