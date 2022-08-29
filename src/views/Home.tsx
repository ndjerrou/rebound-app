import React, { FC } from 'react';
import tw from 'twin.macro';

import { Container, Image, Link, Text } from '../components/html';

const adminStyles = isAdmin ? tw`h-[95vh]` : tw`h-screen`;

const boxPageStyles = tw`flex h-screen justify-center self-center w-full px-8 md:px-32 lg:px-60`;

const boxSocialNetworkStyles = tw`flex flex-wrap justify-center absolute self-end m-4`;

const logoStyles = tw`w-[17rem] self-center text-center pb-20`;

const textSocialNetworkStyles = tw`!text-[0.90rem] p-4 px-2 lg:px-4 xl:px-8 2xl:px-12`;

const pages = [
  {
    ID: 1,
    className: '',
    title: 'Shop',
    to: '/shop',
  },
  {
    ID: 2,
    className: 'App-logo',
    title: 'LookBook',
    to: '/lookbook',
  },
  {
    ID: 3,
    className: '',
    title: 'T.V',
    to: '/video',
  },
];

const { socialNetworks } = rbData;

const tags: { ID: number; title: string; to: string }[] = [];

Object.entries(socialNetworks).forEach(([title, to], ID) =>
  tags.push({
    ID,
    title,
    to,
  }),
);

const Home: FC = () => (
  <Container styles={[boxPageStyles, adminStyles]}>
    {pages &&
      pages.map(({ ID, title, to }) => (
        <Image
          containerStyles={logoStyles}
          styles={tw`w-full`}
          key={ID}
          textStyles={tw`!text-[0.90rem]`}
          to={to}
          withContainer
        >
          {title}
        </Image>
      ))}
    <Container styles={boxSocialNetworkStyles}>
      {tags.map(({ ID, title, to }) => {
        const href = title === 'mail' ? `mailto:${to}` : to;

        return (
          <Link key={ID} href={href} target="_blank">
            <Text styles={textSocialNetworkStyles}>{title}</Text>
          </Link>
        );
      })}
    </Container>
  </Container>
);

export default Home;
