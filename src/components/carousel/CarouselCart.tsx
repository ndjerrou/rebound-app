import React, { FC, Fragment, useContext, useState } from 'react';
import styled, { css, ModalStyledProps, useTheme } from 'styled-components';
import tw from 'twin.macro';

import { Button, Container, Separator, Text } from '../html';
import Product from '../Product';
import { CartContext } from '../../contexts';
import { CartProps } from '../../types/containers';
import { getRarity } from '../../utilities/product';

import arrowUpWhite from '../../assets/images/global/fleche_blanche.png';
import arrowUpBlue from '../../assets/images/global/fleche.png';
import Carousel from './Carousel';
import { PAGE_CHECKOUT } from '../../constants/constants';

const RemoveProduct = styled(Button)<ModalStyledProps>(
  ({ $page, theme: { buttonColor, textColor } }) => [
    tw`rounded-full text-lg font-rb-akira-sup w-12 h-8 self-center absolute top-12 right-16`,
    $page === PAGE_CHECKOUT
      ? [tw`text-white`, buttonColor]
      : [tw`bg-white hover:bg-white/95 active:bg-white/95 text-lg`, textColor],
  ],
);

const CarouselCart: FC<CartProps> = ({ page, setShowCart }) => {
  const { cart, removeProductFromCart } = useContext(CartContext);

  const { backgroundColor, textColor } = useTheme();

  const [indexCarousel, setIndexCarousel] = useState(0);

  const carouselStyles = [tw`relative left--3  mb-4`];

  page === PAGE_CHECKOUT && carouselStyles.push(tw`w-96`);

  const arrowPrevStyles = [
    tw`top-16 !w-8 absolute z-10 !pointer-events-auto cursor-pointer`,
    css`
      transform: rotate(-90deg);
    `,
  ];

  page === PAGE_CHECKOUT
    ? arrowPrevStyles.push(tw`left-[19%]`)
    : arrowPrevStyles.push(tw`left-[2%]`);

  const arrowNextStyles = [
    tw`top-16 !w-8 absolute z-10 !pointer-events-auto cursor-pointer`,
    css`
      transform: rotate(90deg);
    `,
  ];

  page === PAGE_CHECKOUT
    ? arrowNextStyles.push(tw`right-[22%]`)
    : arrowNextStyles.push(tw`right-[9%]`);

  const handleRemoveProduct: RemoveProductToCart<Product> = (product) => {
    removeProductFromCart(product);

    cart.length === 1 && setShowCart && setShowCart(false);
  };

  const arrowUp = page === PAGE_CHECKOUT ? arrowUpBlue : arrowUpWhite;

  return (
    <Carousel
      arrowPrev={arrowUp}
      arrowPrevStyles={arrowPrevStyles}
      arrowNext={arrowUp}
      arrowNextStyles={arrowNextStyles}
      styles={carouselStyles}
      selectedItem={indexCarousel}
      onClickItem={(index: number): void => setIndexCarousel(index)}
    >
      {cart?.map(
        (
          {
            ID,
            post_title,
            rb_cover,
            rb_pa_rarete: { slug: slugRarity } = {},
            rb_podium: podium,
            rb_product_cat: { slug: category } = {},
            rb_product_tag: {
              mn_thumbnail_id: { src: iconNew = '' } = {},
            } = {},
            _sale_price,
          },
          i,
          p,
        ) => {
          const rbRarity = getRarity(slugRarity);

          return (
            <Container styles={tw`flex flex-col w-full`} key={ID}>
              <Product
                page={page}
                category={category}
                id={ID}
                image={rb_cover}
                isNew={iconNew}
                podium={podium}
                price={_sale_price}
                rarety={rbRarity}
                title={post_title}
              />
              <RemoveProduct
                $page={page}
                onClick={(): void => {
                  handleRemoveProduct(p[i]);
                  setIndexCarousel(i - 1);
                }}
              >
                X
              </RemoveProduct>
              {page === PAGE_CHECKOUT && (
                <>
                  <Separator
                    styles={[tw`w-full !h-[1px] my-2`, backgroundColor]}
                  />
                  <Container styles={tw`flex w-full justify-around`}>
                    <Text styles={[tw`!text-xs`, textColor]}>Prix</Text>
                    <Text styles={[tw`!text-xs`, textColor]}>
                      {_sale_price}
                      <Text styles={[tw`!text-xs font-black`, textColor]}>
                        €
                      </Text>
                    </Text>
                  </Container>
                </>
              )}
            </Container>
          );
        },
      )}
    </Carousel>
  );
};

export default CarouselCart;
