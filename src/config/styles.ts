import { DefaultTheme } from 'styled-components';
import tw from 'twin.macro';

const {
  products: { terms: { productCat = [] } = {} },
} = rbData;

const {
  rb_banner: { src: bannerVintage = '' } = {},
  rb_icon_filter: { src: filterVintage = '' } = {},
} = productCat.find(({ slug }) => slug === 'vintage') || {};

const {
  rb_banner: { src: bannerNike = '' } = {},
  rb_icon_filter: { src: filterNike = '' } = {},
} = productCat.find(({ slug }) => slug === 'nike') || {};

const {
  rb_banner: { src: bannerHype = '' } = {},
  rb_icon_filter: { src: filterHype = '' } = {},
} = productCat.find(({ slug }) => slug === 'hype') || {};

export const defaultTheme: DefaultTheme = {
  backgroundColor: tw`bg-blue-rb-800`,
  borderColor: tw`!border-blue-rb-800`,
  buttonColor: tw`bg-blue-rb-800 hover:bg-blue-rb-850 active:bg-blue-rb-850`,
  textColor: tw`!text-blue-rb-800`,
};

export const vintage: DefaultTheme = {
  backgroundColor: tw`bg-black`,
  borderColor: tw`border-black`,
  buttonColor: tw`bg-black hover:bg-black hover:bg-opacity-95 active:bg-black active:bg-opacity-95`,
  textColor: tw`!text-black`,
  themeBanner: bannerVintage,
  themeFilter: filterVintage,
};

export const nike: DefaultTheme = {
  backgroundColor: tw`bg-red-rb-800`,
  borderColor: tw`border-red-rb-800`,
  buttonColor: tw`bg-red-rb-800 bg-red-rb-800 hover:bg-red-rb-900 active:bg-red-rb-900`,
  textColor: tw`!text-red-rb-800`,
  themeBanner: bannerNike,
  themeFilter: filterNike,
};

export const hype: DefaultTheme = {
  backgroundColor: tw`bg-gray-rb-650`,
  borderColor: tw`border-gray-rb-650`,
  buttonColor: tw`bg-gray-rb-650 bg-gray-rb-650 hover:bg-gray-rb-800 active:bg-gray-rb-800`,
  textColor: tw`!text-gray-rb-650`,
  themeBanner: bannerHype,
  themeFilter: filterHype,
};

const category = {
  defaultTheme,
  hype,
  nike,
  vintage,
};

export default category;
