import React, { FC } from 'react';
import tw from 'twin.macro';
import styled, { useTheme } from 'styled-components';

import { Container, Image, Text } from '../html';
import { PickerRarityProps } from '../../types/components';

const StepHeader = styled.h2`
  font-family: Swis721BlkExBT !important;
  font-size: 28px !important;
  text-transform: uppercase;
  color: #000000;
  margin: 0 2.5rem 1.75rem 0.75rem;
`;

const NewIconContainer = styled.div`
  width: 7.5rem;
  transform: rotate(-27deg);
`;

const IconImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const PickerRarity: FC<PickerRarityProps> = ({ description, slug, src }) => {
  const { backgroundColor } = useTheme();

  switch (slug) {
    case 'tout':
      return (
        <>
          <NewIconContainer>
            <IconImage src={src} />
          </NewIconContainer>
          <StepHeader>Check les nouveautées !</StepHeader>
        </>
      );

    default:
      return (
        <>
          <Image
            containerStyles={tw`relative w-[24.25rem] h-[5.5rem]`}
            styles={tw`w-full h-full relative bottom-1`}
            textStyles={tw`!font-rb-swis absolute top--6 left-5 !text-[.55rem] tracking-[.1rem] uppercase font-black`}
            src={src}
            withContainer
          >
            Indice de rareté
          </Image>
          <Container styles={tw`flex flex-col relative`}>
            <Text
              styles={tw`!font-rb-swis absolute top--6 left-5 !text-[.55rem] tracking-[.1rem] uppercase font-black`}
            >
              Prix du marché
            </Text>
            <Container
              styles={[
                tw`rounded-2xl py-2 w-[21rem] h-[4.8rem] flex justify-center items-center`,
                backgroundColor,
              ]}
            >
              <Text styles={tw`!text-white !font-rb-akira-sup !text-[2rem]`}>
                {description}
              </Text>
            </Container>
          </Container>
        </>
      );
  }
};

export default PickerRarity;
