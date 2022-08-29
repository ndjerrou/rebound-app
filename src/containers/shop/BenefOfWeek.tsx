import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import styled, { css, PodiumStyledProps } from 'styled-components';

import { Container, Text } from '../../components/html';

import podiumImage from '../../assets/images/global/podium_pw.png';
import Product from '../../components/Product';
import TextHeading from '../../components/TextHeading';
import { Views } from '../../types/views';

const StepNumber = styled.h2`
  font-family: Akira Super;
  font-size: 51px;
  color: #000000;
  margin: 0.2em;
`;

const StepHeader = styled.h2`
  font-family: Akira Super;
  font-size: 51px;
  color: #000000;
  margin: 0.2em;
`;

const StepDescription = styled.p`
  font-family: Swis721BlkExBT;
  text-transform: uppercase;
  width: 500px;
  font-weight: 900;
  font-size: 16px;
  color: #000000;
  margin: 0.2em;
`;

const StepContainer = styled.div`
  margin-left: 2em;
`;

const ImageContainer = styled.div`
  transform: translate(-95px, -18px);
`;

const PodiumImage = styled.img`
  height: 80%;
  width: 80%;
  object-fit: cover;
`;

const PodiumColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: end;
  height: 210px;
  margin: 1em;
  margin-left: 3em;
  background-color: #24529f;
  border-radius: 60px;
`;

const BuyPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  height: 230px;
  width: 265px;
  background-color: #6ecd7a;
  border-radius: 35px;
  margin: 0 2em 0em 5em;
`;

const SellPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  height: 230px;
  width: 265px;
  margin: 0 5em 0 2em;
  background-color: #00dae1;
  border-radius: 35px;
`;

const BuyNowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 285px;
`;

const PodiumContainer = styled.div<PodiumStyledProps>(({ $podium }) => [
  tw`w-[250px] absolute h-[100px]`,
  $podium === 'mvp' &&
    css`
      transform: translateY(-65px) rotate(-0.02turn);
    `,
  ($podium === 'svp' || $podium === 'tvp') &&
    css`
      transform: translateY(-45px) rotate(-0.02turn);
    `,
]);

const SRCImage = styled.img<PodiumStyledProps>(({ $podium }) => [
  tw`w-full object-contain`,
  $podium === 'mvp' && tw`h-full`,
  ($podium === 'svp' || $podium === 'tvp') && [
    css`
      transform: rotate(-0.04turn);
    `,
    tw`h-[150px]`,
  ],
]);

const RankContainer = styled.div`
  position: absolute;
  width: 130px;
  transform: translate(505px, -75px);
`;

const RankImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const GreenButton = styled.button`
  background-color: #6ecd7a;
  color: #008a17;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.5;
  width: 90%;
  height: 66px;
  padding: 0.5em;
  border: 2px solid #fff;
  border-radius: 50px;
  transform: translateY(11px);
  cursor: pointer;
`;
const BlueButton = styled.button`
  background-color: #00dae1;
  color: #fff;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.5;
  width: 90%;
  height: 66px;
  padding: 0.5em;
  border: 2px solid #fff;
  border-radius: 50px;
  transform: translateY(11px);
  cursor: pointer;
`;
const WhiteButton = styled.button`
  background-color: #fff;
  color: #24529f;
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  width: 200px;
  height: 66px;
  padding: 1em 1.5em;
  border: 2px solid #fff;
  border-radius: 50px;
  transform: translateY(40px);
  cursor: pointer;
`;

const BenefOfWeek: FC<Views> = ({ customRef }) => {
  const {
    products: { items: products },
  } = rbData;

  const navigate = useNavigate();

  return (
    <>
      <Container ref={customRef} styles={tw`flex p-4 justify-between h-40`}>
        <Container styles={tw`flex-col p-4 `}>
          <div style={{ display: 'flex', alignItems: 'start' }}>
            <StepNumber style={{ fontSize: '52px' }}>3</StepNumber>
            <StepContainer>
              <StepHeader style={{ fontSize: '33px' }}>
                Les Benef' de la semaine
              </StepHeader>
              <StepDescription style={{ fontFamily: 'Swis721BlkExBT' }}>
                A chaque drop nous te faisons le top 3 <br /> des tee shirt qui
                se revendent le mieux. <br /> Grâce à ça, tu sais sur lesquelles
                investir.
              </StepDescription>
            </StepContainer>
          </div>
        </Container>
        <ImageContainer>
          <PodiumImage src={podiumImage} />
        </ImageContainer>
      </Container>
      <Container styles={tw`flex flex-col p-4 items-center`}>
        {products &&
          products.map(
            ({
              ID = 0,
              post_title,
              rb_cover,
              rb_marcket_price,
              rb_podium: podium,
              rb_product_cat: { slug: category } = {},
              rb_profit,
              _regular_price,
              _sale_price,
            }) => {
              const profit = rb_profit || String(0);
              const marcketPrice = rb_marcket_price || String(0);

              return (
                podium && (
                  <Container key={ID} styles={tw`flex px-10 items-center`}>
                    <Product
                      category={category}
                      key={ID}
                      id={ID}
                      image={rb_cover}
                      podium={podium}
                      title={post_title}
                      showBenef={false}
                      showPodium
                      isPodium
                    />
                    <PodiumColumn>
                      <BuyPriceContainer>
                        <Text
                          customFont="Akira Expanded"
                          styles={tw`!text-white !text-base`}
                        >
                          Notre prix <br />
                          de vente
                        </Text>
                        <TextHeading styles={tw`!text-white !text-5xl`}>
                          {_sale_price}€
                        </TextHeading>
                        <GreenButton>
                          +{marcketPrice}% <br />
                          du prix du marche
                        </GreenButton>
                      </BuyPriceContainer>
                      <BuyNowContainer>
                        {podium?.mn_thumbnail_id?.src && (
                          <PodiumContainer $podium={podium?.slug}>
                            <SRCImage
                              $podium={podium?.slug}
                              src={podium.mn_thumbnail_id.src}
                            />
                          </PodiumContainer>
                        )}
                        <WhiteButton
                          onClick={(): void =>
                            navigate(`/shop/${category}/products/${ID}`)
                          }
                        >
                          Acheter
                        </WhiteButton>
                      </BuyNowContainer>
                      <SellPriceContainer>
                        <Text
                          customFont="Akira Expanded"
                          styles={tw`!text-white !text-base`}
                        >
                          Estimation <br />
                          resell
                        </Text>
                        <TextHeading styles={tw`!text-white !text-5xl`}>
                          {_regular_price}€
                        </TextHeading>
                        <BlueButton>
                          +{profit}€ <br /> BENEFICE
                        </BlueButton>
                      </SellPriceContainer>
                      {podium?.rb_icon_podium?.src && (
                        <RankContainer>
                          <RankImage src={podium.rb_icon_podium.src} />
                        </RankContainer>
                      )}
                    </PodiumColumn>
                  </Container>
                )
              );
            },
          )}
      </Container>
    </>
  );
};

export default BenefOfWeek;
