import React, { FC } from 'react';
import tw from 'twin.macro';

import { Container, Text } from '../components/html';

const styles = tw`flex justify-center`;

const NotFoundPage: FC = () => (
  <Container styles={styles}>
    <Text>Aucune page !</Text>
  </Container>
);

export default NotFoundPage;
