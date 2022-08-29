import React, { FC } from 'react';
import styled, {
  css,
  PodiumStyledProps,
  ProductStyledProps,
} from 'styled-components';
import tw from 'twin.macro';

import { Container, Image } from './html';
import { PAGE_CHECKOUT } from '../constants/constants';
import { ProductProps } from '../types/components';

import newIcon from '../assets/images/global/new_icon.png';
import benef from '../assets/images/global/benef.png';
import goldtee from '../assets/images/rarity/goldtee.png';
import diamondtee from '../assets/images/rarity/diamondtee.png';
import mastertee from '../assets/images/rarity/mastertee.png';
import shiny from '../assets/images/rarity/shiny.png';

const ProductCardContainer = styled.div`
  height: '474px';
  width: '474px';
  margin: 1em 0.25em;
  display: 'flex';
  flex-direction: column;
`;

const ProductImageContainer = styled.div<ProductStyledProps>(({ $page }) => [
  tw`overflow-hidden`,
  !$page || $page === PAGE_CHECKOUT ? tw`bg-gray-rb-600` : tw`bg-white`,
  $page
    ? tw`w-[180px] h-[124px] rounded-[110px]`
    : tw`w-[256px] h-[200px] rounded-[80px]`,
]);

const PodiumContainer = styled.div<PodiumStyledProps>(({ $podium }) => [
  tw`w-[90px] h-[30px] relative my-0 mx-auto`,
  $podium === 'mvp' &&
    css`
      transform: translateY(-45px) rotate(-0.02turn);
    `,
  $podium === 'svp' &&
    css`
      transform: translateY(-40px) rotate(-0.04turn);
    `,
  $podium === 'tvp' &&
    css`
      transform: translateY(-45px) rotate(-0.04turn);
    `,
]);

const SRCImage = styled.img<PodiumStyledProps>(({ $podium }) => [
  tw`w-full h-full`,
  $podium === 'mvp' && tw`object-contain`,
  ($podium === 'svp' || $podium === 'tvp') && tw`object-cover`,
]);

const ProductTitleContainer = styled.div<ProductStyledProps>(({ $page }) => [
  tw`inline-flex items-center justify-center`,
  css`
    transform: translateX(-5px);
  `,
  $page && tw`w-full`,
]);

const ProductTitle = styled.p<ProductStyledProps>(({ $page, $isPodium }) => [
  tw`!font-rb-Bahns my-2 mx-1 uppercase`,
  !$page || $page === PAGE_CHECKOUT ? tw`!text-gray-rb-800` : tw`!text-white`,
  $page ? tw`!text-[9px]` : tw`!text-[18px]`,
  $isPodium && tw`!text-black`,
]);

const NewIcon = styled.img<ProductStyledProps>(({ $page, $isNew }) => [
  css`
    transform: rotate(-27deg);
  `,
  $page ? tw`!w-6 !h-6` : tw`w-8 h-8`,
  !$isNew && tw`hidden`,
]);

const PriceContainer = styled.div<ProductStyledProps>(({ $page }) => [
  tw`flex justify-center items-center my-0 mx-auto border border-solid rounded-[33px]`,
  $page
    ? tw`w-[110px] h-[22px] border-white`
    : tw`w-[200px] h-[50px] border-gray-rb-900`,
]);

const Price = styled.p<ProductStyledProps>(({ $page }) => [
  tw`w-1/2 text-left !font-rb-Bahns`,
  $page ? tw`!text-[12px] !text-white` : tw`!text-[28px] !text-gray-rb-800`,
]);

const PriceIcon = styled.img`
  position: absolute;
  object-fit: cover;
`;

const BenefOfWeekIcon = styled.img`
  height: 160px;
  width: 160px;
  position: absolute;
  transform: translate(-190px, -60px);
  z-index: 100;
`;

const Product: FC<ProductProps> = ({
  id,
  image,
  isNew,
  page,
  podium,
  price,
  rarety,
  category,
  title,
  showBenef = true,
  showPodium = false,
  isPodium,
}) => {
  let priceIcon = null;

  switch (rarety) {
    case diamondtee:
      priceIcon = (
        <PriceIcon
          style={{
            width: page ? '80px' : '160px',
            height: page ? '50px' : '140px',
            transform: page ? 'translateX(20px)' : 'translateX(40px)',
          }}
          src={rarety}
        />
      );
      break;

    case goldtee:
      priceIcon = (
        <PriceIcon
          style={{
            width: page ? '80px' : '160px',
            height: page ? '50px' : '140px',
            transform: page ? 'translateX(20px)' : 'translateX(40px)',
          }}
          src={rarety}
        />
      );
      break;

    case mastertee:
      priceIcon = (
        <PriceIcon
          style={{
            width: page ? '16px' : '40px',
            height: page ? '16px' : '40px',
            transform: page ? 'translateX(20px)' : 'translateX(55px)',
          }}
          src={rarety}
        />
      );
      break;

    case shiny:
      priceIcon = (
        <PriceIcon
          style={{
            width: page ? '21px' : '60px',
            height: page ? '12px' : '50px',
            transform: page ? 'translateX(20px)' : 'translateX(55px)',
          }}
          src={rarety}
        />
      );
      break;

    default:
      priceIcon = (
        <PriceIcon
          style={{
            width: page ? '45px' : '90px',
            height: page ? '25px' : '50px',
            transform: page ? 'translateX(25px)' : 'translateX(55px)',
          }}
          src={rarety}
        />
      );
      break;
  }

  const containerStyles = [tw`flex justify-between text-center self-center`];

  page && containerStyles.push(tw`mt-8`);

  const imageStyles = [
    tw`object-cover overflow-hidden`,
    css`
      transform: translateY(30px);
    `,
  ];

  page ? imageStyles.push(tw`!w-1/2`) : imageStyles.push(tw`w-4/5 h-full`);

  const checkPodium = (isPodium || podium?.slug === 'mvp') && showPodium;

  return (
    <Container styles={containerStyles}>
      <ProductCardContainer>
        {podium && showBenef && showPodium && <BenefOfWeekIcon src={benef} />}
        <ProductImageContainer $page={page}>
          <Image
            styles={imageStyles}
            src={image}
            to={`/shop/${category}/products/${id}`}
          />
          {checkPodium && (
            <PodiumContainer $podium={podium?.slug}>
              <SRCImage
                $podium={podium?.slug}
                src={podium?.mn_thumbnail_id?.src}
              />
            </PodiumContainer>
          )}
        </ProductImageContainer>
        <ProductTitleContainer $page={page}>
          <NewIcon $page={page} src={newIcon} $isNew={isNew} />
          <ProductTitle $page={page} $isPodium={isPodium}>
            {title}
          </ProductTitle>
        </ProductTitleContainer>
        {price && page !== PAGE_CHECKOUT && (
          <PriceContainer $page={page}>
            <Price $page={page}>{price}€</Price>
            {/* <IconContainer> */}

            {priceIcon}

            {/* </IconContainer> */}
          </PriceContainer>
        )}
      </ProductCardContainer>
    </Container>
  );
};

export default Product;
