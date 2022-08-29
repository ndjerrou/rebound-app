import { Image as LogoTV } from 'evergreen-ui';
import React, { FC } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { Container, Image } from '../components/html';

import logoTV from '../assets/images/global/rebound_tv_logo.png';

const boxVideosStyles = tw`flex justify-center max-h-10`;
const videosStyles = tw`grid grid-cols-3 gap-4`;

const BackgroundStyles = styled(LogoTV)(() => [
  tw`absolute`,
  tw`top-40 sm:top-32 lg:top-16`,
  tw`left-[20%] sm:left-[34%] md:left-[36%] md:left-[36%] lg:left-[40%] xl:left-[42%] 2xl:left-[43%]`,
]);

const Video: FC = () => {
  const { videos } = rbData;

  return (
    <>
      <BackgroundStyles src={logoTV} width={256} height={64} />
      <Container styles={boxVideosStyles}>
        <Container styles={videosStyles}>
          {videos.map(({ ID, rb_cover, _link_url }) => (
            <Image
              key={ID}
              width={128}
              height={128}
              src={rb_cover}
              href={_link_url}
            />
          ))}
        </Container>
      </Container>
    </>
  );
};

export default Video;
