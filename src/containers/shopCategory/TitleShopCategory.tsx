import React, { FC, ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';

import styled, { css, useTheme } from 'styled-components';

import FilterShopCategory from './FilterShopCategory';
import { Button, Container, Image } from '../../components/html';
import { PickerRarity } from '../../components/picker';

import newIcon from '../../assets/images/global/new_icon.png';
import { getProductsCatByRarity } from '../../utilities/product';

const StepDescription = styled.h2`
  font-family: Swis721BlkExBT !important;
  font-size: 0.75rem !important;
  text-transform: uppercase;
  margin: 0 0 0 1.2rem;
  color: #000000;
`;

const StepHeaderContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-left: 1.5rem;
`;

const TitleShopCategory: FC<Products> = ({
  stateItems: [stateProducts, setProducts] = initialState,
}): ReactElement => {
  const { category } = useParams();

  const { backgroundColor, themeFilter, buttonColor } = useTheme();

  const {
    products: { items: products, terms },
  } = rbData;

  const description = '10€';

  const allRarity: Term = {
    term_id: 9999,
    name: 'Tout',
    slug: 'tout',
    rb_banner: {
      src: newIcon,
    },
    description,
  };

  const [stateRarity, setRarity] = useState<Term>(allRarity);

  const [stateModal, setStateModal] = useState<boolean>(false);

  const handleModal = (): void => setStateModal(!stateModal);

  const slugStyle =
    stateRarity.slug === 'tout'
      ? css`
          transform: translateX(-14rem);
          transition: transform 200ms;
        `
      : css`
          transform: translateX(-20rem);
          transition: transform 200ms;
        `;

  const modalStyle = stateModal
    ? slugStyle
    : css`
        transform: translateX(0);
        transition: transform 200ms;
      `;

  const boutonModal = !stateModal && (
    <Image
      styles={tw`w-[10rem] cursor-pointer relative bottom-[1px]`}
      onClick={handleModal}
      src={themeFilter}
    />
  );

  const handleRarity = (rarity: Term): void => {
    // const test = products?.filter(({ rb_pa_rarete }) =>
    //   rarity?.slug === 'tout' ? true : rb_pa_rarete?.slug === rarity?.slug,
    // );

    const filterProducts = getProductsCatByRarity(
      products,
      category,
      rarity?.slug,
    );

    // Array.from(Array(stateProducts.length).keys())
    //   .reverse()
    //   .forEach(
    //     (index) =>
    //       !raritySlug.some(
    //         (slug) => slug === stateProducts[index].rb_pa_rarete?.slug,
    //       ) && stateProducts.splice(index, 1),
    //   );

    setProducts(filterProducts);

    setRarity(rarity);
  };

  return (
    <>
      <FilterShopCategory
        rarity={stateRarity}
        stateItems={[stateProducts, setProducts]}
        stateModal={[stateModal, setStateModal]}
      />
      <Container
        styles={tw`flex flex-col items-center justify-center py-[1.4rem]`}
      >
        <Container styles={tw`w-[61rem] ml-[1.8rem] mb-2`}>
          <StepDescription>Choisis la rareté</StepDescription>
          <Container
            styles={[
              backgroundColor,
              tw`flex justify-around h-[3.7rem] rounded-full px-[5%]`,
            ]}
          >
            <Button
              styles={[
                buttonColor,
                tw`rounded-full py-3 border-none text-[1.1rem]`,
                stateRarity.slug !== allRarity.slug && tw`opacity-60`,
              ]}
              onClick={(): void => handleRarity(allRarity)}
            >
              {allRarity.slug}
            </Button>
            {terms?.paRarity?.map((sPaRarity) => {
              const rarityStyles = [];
              const buttonStyles = [
                buttonColor,
                tw`rounded-full mt-[0.4rem] h-12 w-[5.5rem]`,
                stateRarity.slug !== sPaRarity.slug && tw`opacity-60`,
              ];

              switch (sPaRarity.slug) {
                case 'reboundtee':
                  rarityStyles.push(tw`w-[6.5rem]`);

                  break;

                case 'breaktee':
                  rarityStyles.push(tw`w-[6.5rem]`);
                  buttonStyles.push(tw`w-[6.5rem]`);

                  break;

                case 'epictee':
                  rarityStyles.push(tw`w-[8rem]`);
                  buttonStyles.push(tw`w-[8rem]`);

                  break;

                case 'mastertee':
                  rarityStyles.push(
                    tw`w-10 relative`,
                    css`
                      transform: scaleX(-1) rotate(-15deg);
                    `,
                  );

                  break;

                case 'goldtee':
                  rarityStyles.push(tw`w-16 relative`);

                  break;

                case 'diamondtee':
                  rarityStyles.push(tw`w-16 relative`);

                  break;

                case 'shiny':
                  rarityStyles.push(tw`w-40 relative top-3`);

                  break;

                default:
                  break;
              }

              return (
                <Button
                  styles={buttonStyles}
                  key={sPaRarity.term_id}
                  onClick={(): void => handleRarity(sPaRarity)}
                >
                  <Image
                    styles={rarityStyles}
                    src={sPaRarity?.mn_thumbnail_id?.src}
                  />
                </Button>
              );
            })}
          </Container>
        </Container>
        <StepHeaderContainer styles={modalStyle}>
          <PickerRarity
            description={stateRarity?.description}
            src={stateRarity?.rb_banner?.src}
            slug={stateRarity?.slug}
          />
          {boutonModal}
        </StepHeaderContainer>
      </Container>
    </>
  );
};

export default TitleShopCategory;
