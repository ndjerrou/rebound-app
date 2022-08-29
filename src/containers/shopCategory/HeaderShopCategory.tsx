import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import tw from 'twin.macro';

import { Button, Container, Image } from '../../components/html';

const adminButtonStyles = isAdmin ? tw`top-[6.6rem]` : tw`top-[4.6rem]`;

const adminImageStyles = isAdmin ? tw`top-[-40.3rem]` : tw`top-[-42.3rem]`;

const imageStyles = [
  tw`w-full absolute rounded-b-[70px] object-fill z-20`,
  adminImageStyles,
];

const HeaderShopCategory = (): ReactElement => {
  const navigate = useNavigate();

  const { buttonColor, themeBanner } = useTheme();

  const buttonStyles = [
    tw`absolute right-[5.4%] w-[9rem] h-[3.3rem] text-[0.75rem] z-20`,
    adminButtonStyles,
  ];

  buttonStyles.push(buttonColor);

  return (
    <Container styles={tw`h-[11rem]`}>
      <Image styles={imageStyles} src={themeBanner} />
      <Button isBack styles={buttonStyles} onClick={(): void => navigate(-1)}>
        Retour
      </Button>
    </Container>
  );
};

export default HeaderShopCategory;
