import React, { FC, ReactElement, useState } from 'react';
import tw from 'twin.macro';
import styled, { css } from 'styled-components';

import {
  Button,
  Container,
  Image,
  Separator,
  Text,
} from '../../components/html';

import centerLogo from '../../assets/images/global/mini_logo_en_bas_de_page.png';
import singleStitch from '../../assets/images/global/validation_sp.png';
import { ProductDetailsProps } from '../../types/containers';

const SeparatorVertical = styled(Separator)`
  transform: rotate(90deg);
`;

const TagStyles = styled.img`
  ${tw`relative rounded-full w-[90px] h-[76px] bottom-2`}
`;

const ConditionStyles = styled.img`
  ${tw`w-[40px] my-[55px] relative bottom-[55px]`}
`;

const ProductDetails: FC<ProductDetailsProps> = ({
  item: product,
  setShowInformation,
}) => {
  const {
    rb_pa_rarete: { rb_banner: { src: srcRarity = '' } = {} } = {},
    rb_pa_condition: {
      name: nameCondition,
      mn_thumbnail_id: { src: srcCondition = '' } = {},
    } = {},
    rb_pa_mensurations: { name: nameMensurations } = {},
    rb_pa_single_stitch: { slug: slugSingleStitch } = {},
    rb_pa_taille: { slug: slugTaille } = {},
    rb_profit,
    _sale_price,
    rb_thumbnail_tag,
    rb_pa_production_year: { name: nameProductionYear } = {},
  } = product;

  const handleInfoProduct = (): void =>
    setShowInformation && setShowInformation(true);

  return (
    <Container
      styles={tw`flex flex-col w-[64.5rem] border-solid border-4 border-gray-rb-700 rounded-[85px] px-4 pt-[3.1rem] mt-[-.25rem] ml-[-.25rem]`}
    >
      <Container styles={tw`flex justify-around`}>
        <Image
          containerStyles={tw`relative w-[23.25rem] h-[4.5rem]`}
          styles={tw`w-full h-full relative bottom-1`}
          textStyles={tw`!font-rb-swis absolute top--6 left-5 !text-[.55rem] tracking-[.1rem] uppercase font-black`}
          src={srcRarity}
          withContainer
        >
          Indice de rareté
        </Image>
        <Container styles={tw`flex flex-col relative`}>
          <Text
            styles={tw`!font-rb-swis absolute top--6 left-5 !text-[.55rem] tracking-[.1rem] uppercase font-black`}
          >
            Prix du marché (moyenne)
          </Text>
          <Container
            styles={tw`!bg-blue-rb-800 rounded-2xl py-2 w-[21rem] h-[3.8rem] flex justify-center items-center`}
          >
            <Text styles={tw`!text-white !font-rb-swis !text-[2.5rem]`}>
              ~ {rb_profit}€
            </Text>
          </Container>
        </Container>
        <Container styles={tw`flex flex-col relative`}>
          <Text
            styles={tw`!font-rb-swis absolute top--6 !text-[.55rem] tracking-[.1rem] uppercase !leading-3 font-black w-20 text-center `}
          >
            Estimation resell
          </Text>
          <Container
            styles={tw`!bg-blue-rb-800 rounded-full w-[5.5rem] h-[3.8rem] flex justify-center items-center`}
          >
            <Text styles={tw`!text-white !font-rb-swis !text-2xl`}>
              +{Number(rb_profit) - Number(_sale_price)}
            </Text>
          </Container>
        </Container>
        <SeparatorVertical styles={tw`w-[4.8rem] relative top-5 mx--8`} />
        <Container styles={tw`flex flex-col relative bottom-8`}>
          <Container styles={tw`flex pb-2`}>
            <Text
              styles={tw`!font-rb-swis !text-[1.2rem] tracking-[.1rem] uppercase !leading-[.8rem] w-2.5 relative right-3`}
            >
              +
            </Text>
            <Text
              styles={tw`!font-rb-swis !text-[.6rem] tracking-[.1rem] uppercase !leading-[.8rem] w-20`}
            >
              d'infos revente
            </Text>
          </Container>
          <Button
            styles={[
              tw`bg-blue-rb-800 hover:bg-blue-rb-850 active:bg-blue-rb-850 pt-2 w-20 pr-[10px] rounded-2xl !font-rb-Bahns !text-[3.5rem] italic font-black relative right-1 hover:opacity-100`,
              css`
                transition: opacity 500ms;
              `,
            ]}
            onClick={handleInfoProduct}
          >
            $
          </Button>
        </Container>
      </Container>
      <Separator styles={tw`self-center w-3/4 mb-4`} />
      <Container styles={tw`flex justify-around mx-[16%]`}>
        <Button
          styles={tw`!bg-blue-rb-800 hover:!bg-blue-rb-850 active:bg-blue-rb-850 rounded-[3.5rem] w-64 h-40`}
        >
          <Container styles={tw`flex flex-col items-center`}>
            <Text styles={tw`!font-rb-swis !text-white relative bottom-4`}>
              Etiquette
            </Text>
            {rb_thumbnail_tag && <TagStyles src={rb_thumbnail_tag} />}
          </Container>
        </Button>
        <Button
          styles={tw`!bg-blue-rb-800 hover:!bg-blue-rb-850 active:bg-blue-rb-850 rounded-[3.5rem] w-64 h-40 pt-0 pb-4`}
        >
          <Container styles={tw`flex flex-col`}>
            <Text styles={tw`!font-rb-swis !text-white text-left !leading-5`}>
              Taille & <br /> Mensuration
            </Text>
            <Text styles={tw`!font-rb-swis !text-white !text-4xl py-1`}>
              {slugTaille}
            </Text>
            <Text styles={tw`!font-rb-swis !text-blue-rb-400`}>
              {nameMensurations}
            </Text>
          </Container>
        </Button>
      </Container>
      <Separator styles={tw`self-center w-1/3 my-8`} />
      <Container styles={tw`flex justify-around`}>
        <Button
          styles={tw`!bg-blue-rb-800 hover:!bg-blue-rb-850 active:bg-blue-rb-850 rounded-[3.5rem] w-56 h-32`}
        >
          <Container styles={tw`flex flex-col items-center`}>
            <Text styles={tw`!font-rb-swis !text-white relative bottom-4`}>
              Année Date
            </Text>
            <Text styles={tw`!font-rb-swis !text-white text-left`}>
              {nameProductionYear}
            </Text>
          </Container>
        </Button>
        <Button
          styles={tw`!bg-blue-rb-800 hover:!bg-blue-rb-850 active:bg-blue-rb-850 rounded-[3.5rem] w-56 h-32`}
        >
          <Container styles={tw`flex flex-col items-center`}>
            <Text styles={tw`!font-rb-swis !text-white relative bottom-4`}>
              Single Stitch
            </Text>
            <Container styles={tw`flex`}>
              <Text styles={tw`!font-rb-swis !text-white text-left`}>
                {slugSingleStitch || 'No'}
              </Text>
              {slugSingleStitch && (
                <Image
                  styles={tw`w-[32px] h-[32px] relative left-[14px] bottom-[2px]`}
                  src={singleStitch}
                />
              )}
            </Container>
          </Container>
        </Button>
        <Button
          styles={tw`!bg-blue-rb-800 hover:!bg-blue-rb-850 active:bg-blue-rb-850 rounded-[3.5rem] w-56 h-32`}
        >
          <Container
            styles={tw`flex flex-col items-center relative top-[58px]`}
          >
            <Text styles={tw`!font-rb-swis !text-white`}>Condition</Text>
            <ConditionStyles src={srcCondition} />
            <Text styles={tw`!font-rb-swis !text-white relative bottom[110px]`}>
              {nameCondition}
            </Text>
          </Container>
        </Button>
      </Container>
      <Image
        styles={tw`relative top-5 left-[40%]`}
        src={centerLogo}
        width={250}
        height={250}
      />
    </Container>
  );
};

export default ProductDetails;
