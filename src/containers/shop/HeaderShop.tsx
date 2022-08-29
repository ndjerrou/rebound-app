import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import CampaignHeaders from '../../components/CampaignHeaders';
import { Carousel } from '../../components/carousel';
import { Container, Text } from '../../components/html';

import arrowWhite from '../../assets/images/global/fleche_blanche.png';
import { Views } from '../../types/views';

const HeaderBackgroundStyles = styled(Container)`
  ${tw`absolute w-full bg-blue-rb-800 h-44 rounded-b-[44px]`}
`;

const arrowPrevStyles = [
  css`
    transform: rotate(-90deg);
  `,
  tw`!w-10 absolute top-[5.5rem] left-[26rem] !pointer-events-auto cursor-pointer z-10`,
];

const arrowNextStyles = [
  css`
    transform: rotate(90deg);
  `,
  tw`!w-10 absolute top-[5.5rem] right-[26rem] !pointer-events-auto cursor-pointer z-10`,
];

const textstyles = tw`!text-white block !text-sm !uppercase !font-rb-swis`;

const HeaderShop: FC<Views> = ({ refs }) => {
  const WantToBuy = (
    <>
      <Text styles={[textstyles, tw`mt-[-1rem]`]}>Tu veux de l'argenté ?</Text>
      <Text styles={textstyles}>
        Check les tees que nous sommes prêt á tacheter !
      </Text>
    </>
  );

  return (
    <>
      <HeaderBackgroundStyles />
      <Carousel
        arrowPrev={arrowWhite}
        arrowPrevStyles={arrowPrevStyles}
        arrowNext={arrowWhite}
        arrowNextStyles={arrowNextStyles}
        centerMode
        infiniteLoop
      >
        <CampaignHeaders
          blurb="Check le dernier drop !"
          cta="ENTRER"
          customRef={refs?.refNewDrop}
          title="Nouveau Drop"
        />
        <CampaignHeaders
          blurb="Check le top 3 de la semaine"
          cta="ENTRER"
          customRef={refs?.refBenefOfWeek}
          title="Les benef' de la semaine"
        />
        <CampaignHeaders
          blurb={WantToBuy}
          cta="ENTRER"
          customRef={refs?.refWantToBuy}
          title="Want To Buy"
        />
      </Carousel>
    </>
  );
};

export default HeaderShop;
