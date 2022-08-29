import React, { FC, useState } from 'react';
import tw from 'twin.macro';

import { Container, Image, Text } from '../components/html';

const styles = tw`
flex flex-col items-center justify-center flex-wrap md:flex-row
md:justify-items-stretch lg:flex-nowrap lg:items-start
`;
const galleryStyles = tw`w-2/3 grid grid-cols-4 m-4 md:grid-cols-7 md:w-1/3`;
const tagStyle = tw`flex items-center justify-end`;

const Lookbook: FC = () => {
  const { lookbooks } = rbData;
  const [lookbook, setLookbook] = useState(lookbooks.at(0));
  const [lookpage, setLookpage] = useState(lookbooks.at(0)?.rb_cover);

  const handleTags = (handleLookbook: LookBook): void => {
    setLookbook(handleLookbook);
    setLookpage(handleLookbook.rb_cover);
  };

  return (
    <Container styles={styles}>
      <Container styles={tw`m-4`}>
        {lookbooks &&
          lookbooks.map(({ ID, post_title, rb_tag }, i) => (
            <Container key={ID} styles={tagStyle}>
              {rb_tag && (
                <Image src={rb_tag?.mn_thumbnail_id?.src} width={32} />
              )}
              <Text onClick={(): void => handleTags(lookbooks[i])}>
                {post_title}
              </Text>
            </Container>
          ))}
      </Container>
      <Container styles={tw`m-4 w-[256px] h-[384px]`}>
        <Image styles={tw`w-full h-full`} src={lookpage} />
      </Container>
      <Container styles={galleryStyles}>
        {lookbook?.rb_gallery?.map(({ id, src }) => (
          <Image
            key={id}
            styles={tw`w-5/6 h-5/6`}
            onClick={(): void => setLookpage(src)}
            src={src}
            maxWidth={64}
            height={96}
          />
        ))}
      </Container>
    </Container>
  );
};

export default Lookbook;
