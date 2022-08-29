import React, { ReactElement, useContext, useRef } from 'react';
import tw from 'twin.macro';
import styled, { css } from 'styled-components';

import { CartContext } from '../../contexts';
import { Carousel } from '../../components/carousel';
import {
  Button,
  Container,
  Image,
  Separator,
  Text,
} from '../../components/html';
import { checkProductInCart } from '../../utilities/cart';
import { scrollTo } from '../../utilities/functions';
import { getRarity } from '../../utilities/product';

import arrow from '../../assets/images/global/fleche.png';
import diamondtee from '../../assets/images/rarity/diamondtee.png';
import goldtee from '../../assets/images/rarity/goldtee.png';
import mastertee from '../../assets/images/rarity/mastertee.png';
import shiny from '../../assets/images/rarity/shiny.png';

const ButtonPrice = styled(Button)`
  ${tw`rounded-full bg-blue-rb-800 hover:bg-blue-rb-850 active:bg-blue-rb-850 w-48 h-[4.5rem] absolute right-40 px-16 pt-10 pb-4 flex-col`}
  & span {
    ${tw`!font-rb-swis`}
  }
`;

const ProductTitle = styled.h2`
  ${tw`!font-rb-akira-sup !leading-10 font-medium uppercase !text-[1.2rem]`}
`;

const InformationTitle = styled.h2`
  ${tw`!font-rb-akira-sup !leading-10 font-medium uppercase !text-[1.5rem] !text-black mt--2 mb-0 flex items-center`}
`;

const PriceIcon = styled.img`
  object-fit: cover;
  height: 50px;
  width: 100px;
`;

const arrowStyles = tw`!w-8 absolute z-10 !pointer-events-auto cursor-pointer`;

const rotate90 = css`
  transform: rotate(90deg);
`;

const rotate180 = css`
  transform: rotate(180deg);
`;

const rotate270 = css`
  transform: rotate(-90deg);
`;

const arrowUpStyles = [arrowStyles, tw`top-52 right--8`];

const arrowDownStyles = [arrowStyles, rotate180, tw`top--8 right--8`];

const arrowPrevStyles = [arrowStyles, rotate270, tw`left-[13rem] top-[15rem]`];

const arrowNextStyles = [arrowStyles, rotate90, tw`right-[13rem] top-[15rem]`];

const ProductPresentation = ({
  item: product,
}: {
  item: Product;
}): ReactElement => {
  const { cart, addProductToCart, removeProductFromCart } =
    useContext(CartContext);

  const productDetails = useRef(null);

  const {
    ID,
    post_title,
    rb_cover,
    rb_gallery,
    rb_pa_rarete: { slug: slugRarity } = { slug: '' },
    rb_product_cat: { rb_icon_button: { src: srcProductCat = '' } = {} } = {},
    rb_product_tag: { mn_thumbnail_id: { src: iconNew = '' } = {} } = {},
    _sale_price,
  } = product;

  const isCart = checkProductInCart(ID, cart);

  let priceIcon = null;

  const rbRarity = getRarity(slugRarity);

  switch (rbRarity) {
    case diamondtee:
      priceIcon = (
        <PriceIcon
          style={{
            width: '90px',
            height: '120px',
            position: 'relative',
            bottom: '27px',
          }}
          src={rbRarity}
        />
      );
      break;

    case goldtee:
      priceIcon = (
        <PriceIcon
          style={{
            width: '130px',
            height: '165px',
            position: 'relative',
            bottom: '48px',
          }}
          src={rbRarity}
        />
      );
      break;

    case mastertee:
      priceIcon = (
        <PriceIcon
          style={{
            width: '50px',
            height: '50px',
            transform: 'translateX(20px)',
            position: 'relative',
            top: '4px',
          }}
          src={rbRarity}
        />
      );
      break;

    case shiny:
      priceIcon = (
        <PriceIcon
          style={{
            width: '60px',
            height: '50px',
            transform: 'translateX(30px)',
            position: 'relative',
            top: '6px',
          }}
          src={rbRarity}
        />
      );
      break;

    default:
      priceIcon = (
        <PriceIcon
          style={{
            width: '144px',
            height: '50px',
            transform: 'translateX(8px)',
            position: 'relative',
            top: '4px',
          }}
          src={rbRarity}
        />
      );
      break;
  }

  const handleCart = (): void => {
    !isCart ? addProductToCart(product) : removeProductFromCart(product);
  };

  return (
    <>
      <Carousel
        styles={tw`mt--4`}
        arrowPrev={arrow}
        arrowPrevStyles={arrowPrevStyles}
        arrowNext={arrow}
        arrowNextStyles={arrowNextStyles}
        centerMode
        infiniteLoop
      >
        <Container styles={tw`w-[40rem] h-[26rem]`}>
          <Image
            styles={css`
              width: 60% !important;
              height: 100%;
              object-fit: contain;
              transform: translateY(15px);
            `}
            // productStyles
            src={rb_cover}
          />
        </Container>
        {rb_gallery?.map(({ id, src }) => (
          <Container key={id}>
            <Image
              src={src}
              width={450}
              maxWidth={450}
              height={300}
              maxHeight={300}
            />
          </Container>
        ))}
      </Carousel>
      <Container styles={tw`flex relative py-8`}>
        {iconNew ? (
          <Image
            styles={[
              tw`w-[4.5rem] h-[4.5rem] ml-8`,
              css`
                transform: rotate(-27deg);
              `,
            ]}
            src={iconNew}
          />
        ) : (
          <Container styles={tw`w-[70px]`} />
        )}
        <ProductTitle>{post_title}</ProductTitle>
        {priceIcon}
        <ButtonPrice onClick={handleCart}>
          {!isCart ? (
            <>
              <Text styles={tw`!text-[.7rem] !text-white h-5`}>Acheter</Text>
              <Text
                styles={[
                  {
                    textShadow: '0px 0px 13px #8ED6FF',
                  },
                  tw`!text-[2rem] !text-blue-rb-400 pt-1 pb-10`,
                ]}
              >
                {_sale_price}€
              </Text>
            </>
          ) : (
            <Text styles={tw`!text-white mb-6`}>Annuler</Text>
          )}
        </ButtonPrice>
      </Container>
      <Container styles={tw`flex relative ml--4`}>
        <InformationTitle>
          <Text styles={tw`!font-rb-akira-sup !text-[2.25rem] mr-4`}>+ </Text>
          D'informations
        </InformationTitle>
        <Separator styles={tw`w-[43rem] relative top-3.5 left-6`} />
        <Image
          onClick={(): void => scrollTo(productDetails)}
          styles={arrowDownStyles}
          src={arrow}
        />
        <Image
          onClick={(): void => scrollTo(0)}
          ref={productDetails}
          styles={arrowUpStyles}
          src={arrow}
        />
      </Container>
      <Container styles={tw`self-center`}>
        <Image src={srcProductCat} width={200} />
      </Container>
    </>
  );
};

export default ProductPresentation;
