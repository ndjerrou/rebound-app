import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import newTag from '../assets/images/global/new_icon.png';

const ProductContainer = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProductImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const TagContainer = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  top: 60px;
  left: 5.25rem;
  transform: rotate(-27deg);
`;

type Props = {
  image: string;
  slug: string;
  to: string;
};

const StyleImage = ({ image, slug, to }: Props): ReactElement => (
  <Link to={to}>
    {slug === 'vintage' ? (
      <ProductContainer className="carousel-image-container">
        <TagContainer>
          <img src={newTag} alt="new-tag" />
        </TagContainer>
        <ProductImage src={image} />
      </ProductContainer>
    ) : (
      <ProductContainer>
        <ProductImage src={image} />
      </ProductContainer>
    )}
  </Link>
);

export default StyleImage;
