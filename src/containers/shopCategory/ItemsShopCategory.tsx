import React, { FC, useEffect, useState } from 'react';
import tw from 'twin.macro';
import ReactPaginate from 'react-paginate';

import styled from 'styled-components';

import { Container, Separator } from '../../components/html';
import Product from '../../components/Product';
import { getRarity } from '../../utilities/product';

const productStyles = tw`grid grid-cols-3 gap-4 m-4 md:grid-cols-3`;

const PaginateStyles = styled(ReactPaginate)`
  ${tw`list-none font-rb-Bahns font-bold flex m-0 p-0 cursor-pointer`}
  & .selected {
    color: black;
  }
  & li {
    padding: 0.5rem;
  }
`;

const Items: FC<Products> = ({ items: products }) => {
  const [stateNewProduct, setStateNewProduct] = useState(false);
  return (
    <Container styles={productStyles}>
      {products?.map(
        ({
          ID,
          post_title,
          rb_cover,
          rb_pa_rarete: { slug: slugRarity } = {},
          rb_podium,
          rb_product_cat: { slug: category } = {},
          rb_product_tag: { mn_thumbnail_id: { src: iconNew = '' } = {} } = {},
          _sale_price,
        }) => {
          const rbRarity = getRarity(slugRarity);

          const addSeparator = <Separator />;

          return (
            <Product
              category={category}
              key={ID}
              id={ID}
              image={rb_cover}
              isNew={iconNew}
              podium={rb_podium}
              price={_sale_price}
              rarety={rbRarity}
              title={post_title}
            />
          );
        },
      )}
    </Container>
  );
};

const ItemsShopCategory: FC<Products> = ({
  stateItems: [products] = initialState,
}) => {
  console.log(products);
  const itemsPerPage = 9;
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(undefined);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    setCurrentItems(products?.slice(itemOffset, endOffset));

    setPageCount(Math.ceil((products?.length || 0) / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  // Invoke when user click to request another page.
  const handlePageClick = (e: { selected: number }): void => {
    const { selected } = e;

    const newOffset = (selected * itemsPerPage) % (products?.length || 1);

    console.log(
      `User requested page number ${selected}, which is offset ${newOffset}`,
    );

    setItemOffset(newOffset);
  };

  return (
    <Container styles={tw`flex flex-col items-center p-4 justify-center`}>
      <Items items={currentItems} />
      <PaginateStyles
        breakLabel="..."
        nextLabel=""
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel=""
      />
    </Container>
  );
};

export default ItemsShopCategory;
