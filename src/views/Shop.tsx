import React, { FC, useRef } from 'react';

import tw from 'twin.macro';
import { Separator } from '../components/html';
import { ModalCart } from '../components/modal';
import { PAGE_SHOP } from '../constants/constants';
import BenefOfWeek from '../containers/shop/BenefOfWeek';
import ChooseYourStyle from '../containers/shop/ChooseYourStyle';
import HeaderShop from '../containers/shop/HeaderShop';
import NewDrop from '../containers/shop/NewDrop';
import WantToBuy from '../containers/shop/WantToBuy';
import Footer from '../containers/shop/Footer';

const Shop: FC = () => {
  const refNewDrop = useRef(null);
  const refBenefOfWeek = useRef(null);
  const refWantToBuy = useRef(null);

  const refs = { refNewDrop, refBenefOfWeek, refWantToBuy };
  console.log(refs);

  return (
    <>
      <ModalCart page={PAGE_SHOP} />
      <HeaderShop refs={refs} />
      {/* <Image backgroundStyles src={background} /> */}
      <ChooseYourStyle />
      <Separator styles={tw`w-[76%] h-[1px] bg-gray-rb-900 mx-auto`} />
      <NewDrop customRef={refNewDrop} />
      <Separator styles={tw`w-[76%] h-[1px] bg-gray-rb-900 mx-auto`} />
      <BenefOfWeek customRef={refBenefOfWeek} />
      <Separator styles={tw`w-[76%] h-[1px] bg-gray-rb-900 mx-auto`} />
      <WantToBuy customRef={refWantToBuy} />
      <Footer />
    </>
  );
};

export default Shop;
