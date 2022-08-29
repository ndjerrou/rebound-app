import React, { FC, RefObject } from 'react';
import tw from 'twin.macro';
import { CampaignHeadersProps } from '../types/components';
import { scrollTo } from '../utilities/functions';

import { Button, Container, Text } from './html';
import TextHeading from './TextHeading';

const CampaignHeaders: FC<CampaignHeadersProps> = ({
  blurb,
  cta,
  title,
  customRef,
}) => (
  <Container styles={tw`flex flex-col h-full p-4 mt-8`}>
    <TextHeading styles={tw`!text-white !text-4xl lg:!text-lg`}>{title}</TextHeading>
    <Text
      styles={tw`!text-white block !text-base !uppercase mt-4 !font-rb-swis lg:!text-md`}
    >
      {blurb}
    </Text>
    <Button
      styles={tw`bg-gray-rb-700 hover:bg-gray-rb-750 active:bg-gray-rb-750 rounded h-[1.6rem] w-[4.8rem] mt-4 self-center text-[0.9rem]`}
      onClick={(): void => scrollTo(customRef as RefObject<HTMLDivElement>)}
    >
      {cta}
    </Button>
  </Container>
);

export default CampaignHeaders;
