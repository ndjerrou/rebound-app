import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { hype, nike, vintage } from '../config/styles';
import Footer from '../containers/shop/Footer';
import { getProductsCatByRarity } from '../utilities/product';
import HeaderShopCategory from '../containers/shopCategory/HeaderShopCategory';
import ItemsShopCategory from '../containers/shopCategory/ItemsShopCategory';
import TitleShopCategory from '../containers/shopCategory/TitleShopCategory';

const ShopCategory: FC = () => {
  const {
    products: { items: products },
  } = rbData;

  const { category } = useParams();

  const filterProducts = getProductsCatByRarity(products, category);
  // const filterProducts = products || [];

  const stateFilterProducts = useState<Product[]>(filterProducts);

  let theme;

  switch (category) {
    case 'nike':
      theme = nike;

      break;

    case 'hype':
      theme = hype;

      break;

    default:
      theme = vintage;

      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <HeaderShopCategory />
      <TitleShopCategory stateItems={stateFilterProducts} />
      <ItemsShopCategory stateItems={stateFilterProducts} />
      <Footer />
    </ThemeProvider>
  );
};

export default ShopCategory;
