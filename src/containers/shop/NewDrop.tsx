import React, { FC } from 'react';
import tw from 'twin.macro';

import styled from 'styled-components';

import { Container, Separator } from '../../components/html';
import Product from '../../components/Product';
import { getRarity } from '../../utilities/product';

import newIcon from '../../assets/images/global/new_icon.png';
import box from '../../assets/images/global/icon_new_drop.png';
import { Views } from '../../types/views';

const productStyles = tw`grid grid-cols-3 gap-4 m-4 md:grid-cols-3`;

const StepNumber = styled.h2`
  font-family: Akira Super;
  position: absolute;
  justify-self: start;
  font-size: 51px;
  color: #000000;
  margin: 0.2em 1em;
  padding: 0.2em 0;
`;

const StepHeader = styled.h2`
  font-family: Akira Super;
  font-size: 36px !important;
  color: #000000;
  margin: 0.2em 0.25em;
`;

const StepDescription = styled.p`
  font-family: Swis721BlkExBT;
  text-transform: uppercase;
  text-align: center;
  width: 700px;
  font-size: 16px;
  color: #000000;
`;

const StepHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const NewIconContainer = styled.div`
  width: 70px;
  transform: rotate(-27deg);
`;

const DropIconContainer = styled.div`
  width: 75px;
`;
const IconImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const NewDrop: FC<Views> = ({ customRef }) => {
  const {
    products: { items: products },
  } = rbData;
  console.log(products);

  return (
    <Container ref={customRef} styles={tw`flex p-4 justify-between`}>
      <StepNumber style={{ fontSize: '44px' }}>2</StepNumber>
      <Container styles={tw`flex flex-col items-center justify-center w-full`}>
        <StepHeaderContainer>
          <NewIconContainer>
            <IconImage src={newIcon} />
          </NewIconContainer>
          <StepHeader>NOUVEAU DROP</StepHeader>
          <DropIconContainer>
            <IconImage src={box} />
          </DropIconContainer>
        </StepHeaderContainer>
        <StepDescription style={{ fontFamily: 'Swis721BlkExBT' }}>
          Ce drop est sur le pop culture movie,
          <br /> nous t'avons proposé une selection de tee vintage <br /> super
          rare avec un vrai délire! <br /> Les fils choisis sont iconiques, en
          reconnais tu un ?
        </StepDescription>
        <Separator styles={tw`w-[50%] h-[1px] bg-gray-rb-900 mx-auto`} />
        <Container styles={productStyles}>
          {products &&
            products.map(
              (
                {
                  ID,
                  post_title,
                  rb_cover,
                  rb_pa_rarete: { slug: slugRarity } = {},
                  rb_podium,
                  rb_product_cat: { slug: category } = {},
                  _sale_price,
                  rb_product_tag: {
                    mn_thumbnail_id: { src: iconNew = '' } = {},
                  } = {},
                },
                i,
              ) => {
                const rbRarity = getRarity(slugRarity);

                return (
                  i < 9 && (
                    <Product
                      category={category}
                      key={ID}
                      id={ID}
                      image={rb_cover}
                      isNew={iconNew}
                      podium={rb_podium}
                      price={_sale_price}
                      showPodium
                      rarety={rbRarity}
                      title={post_title}
                    />
                  )
                );
              },
            )}
        </Container>
      </Container>
    </Container>
  );
};

export default NewDrop;
