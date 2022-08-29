import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';

import NotFoundPage from './NotFoundPage';
import { Container } from '../components/html';
import { ModalCart, ModalGetProductInfo } from '../components/modal';
import { PAGE_PRODUCT } from '../constants/constants';
import ProductPresentation from '../containers/product/ProductPresentation';
import ProductDetails from '../containers/product/ProductDetails';

const styles = tw`flex flex-col px-[15%]`;

const Product: FC = () => {
  const {
    products: { items: products },
  } = rbData;

  const { id, category } = useParams();

  const product = products?.find(({ ID }) => ID === Number(id));

  const isCategory = product?.rb_product_cat?.slug === category;

  const [stateShowInformation, setShowInformation] = useState<boolean>(false);

  return product && isCategory ? (
    <>
      <ModalCart page={PAGE_PRODUCT} />
      <ModalGetProductInfo
        title={product?.post_title}
        stateModal={[stateShowInformation, setShowInformation]}
      />
      <Container styles={styles}>
        <ProductPresentation item={product} />
        <ProductDetails
          item={product}
          setShowInformation={setShowInformation}
        />
      </Container>
    </>
  ) : (
    <NotFoundPage />
  );
};

export default Product;
