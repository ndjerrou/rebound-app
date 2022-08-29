import { FormikContextType, FormikValues, useFormikContext } from 'formik';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled, { AppStyledProps, useTheme } from 'styled-components';
import tw from 'twin.macro';
import { PickerItemRarityProps } from '../../types/html';

import { FormField } from '../forms';
import { Container, Image, Text } from '../html';

const FilterBouton = styled(Container)<AppStyledProps>(({ $styles }) => [
  tw`flex items-center rounded-[40px]`,
  $styles,
]);

const PickerTerm: FC<PickerItemRarityProps> = ({ data, name }) => {
  const { category } = useParams();

  const { backgroundColor, borderColor, buttonColor, textColor } = useTheme();

  let rarityRender;

  const inputStyles = [];
  const labelStyles = [tw`cursor-pointer list-item`];

  // console.log(data);

  const taxonomy = data?.taxonomy;

  const { values }: FormikContextType<FormikValues> = useFormikContext();

  const isValidatingStyles = values[name] === data?.slug;

  let validatingStyles;

  switch (taxonomy) {
    case 'pa_condition':
      labelStyles.push(tw`opacity-40`);

      inputStyles.push(tw`hidden`);

      validatingStyles = isValidatingStyles && tw`opacity-100`;

      rarityRender = (
        <Image
          containerStyles={[
            tw`flex flex-col justify-center items-center w-16 h-[2.8rem]`,
          ]}
          styles={tw`w-[2.2rem] relative z-[-1]`}
          textStyles={tw`!text-[.4rem] !leading-[.4rem]`}
          withContainer
          src={data?.mn_thumbnail_id?.src}
        >
          {data?.name}
        </Image>
      );

      break;

    case 'pa_taille':
      labelStyles.push(
        tw`w-8 flex justify-center mx-1 py-1 border-solid border rounded-[14px] text-base cursor-pointer`,
      );

      inputStyles.push(tw`hidden`);

      validatingStyles = isValidatingStyles && [
        tw`text-white`,
        backgroundColor,
      ];

      rarityRender = data?.name;

      break;

    case 'pa_theme':
      return (
        <Text styles={[tw`relative !text-[.8rem] top-4`, textColor]}>
          {data?.slug}
        </Text>
      );

    case 'pa_single-stitch':
      labelStyles.push(
        tw`text-sm text-white flex justify-center items-center w-20 h-10 mt-[6px] mx-2 rounded-full border-solid border-2 border-gray-rb-900 uppercase cursor-pointer opacity-40`,
        backgroundColor,
      );

      inputStyles.push(tw`hidden`);

      validatingStyles = isValidatingStyles && tw`opacity-100`;

      rarityRender = data?.slug;

      break;

    case 'rb_periode':
      labelStyles.push(
        tw`flex justify-center !font-rb-swis !text-[1.25rem] !leading-[1.25rem] cursor-pointer opacity-40`,
        textColor,
      );

      inputStyles.push(tw`hidden`);

      validatingStyles =
        (!values[name] || isValidatingStyles) && tw`opacity-100`;

      rarityRender = data?.name;

      break;

    case 'pa_couleur':
      switch (data?.slug) {
        case 'blanc':
          rarityRender = (
            <Container
              styles={tw`w-[2.5rem] h-[2.5rem] border-solid border-black border rounded-full bg-white cursor-pointer`}
            />
          );

          break;

        case 'noir':
          rarityRender = (
            <Container
              styles={tw`w-[2.5rem] h-[2.5rem] mx-2 rounded-full bg-black cursor-pointer`}
            />
          );

          break;

        default:
          {
            const nameSplit = data?.name?.split(' ');

            rarityRender = (
              <FilterBouton
                $styles={[tw`border-solid border-2`, borderColor]}
                styles={tw`w-[5.5rem] ml-4 flex flex-col !rounded-[12px] py-2 cursor-pointer`}
              >
                <Text styles={tw`!font-rb-swis !text-[.7rem] !leading-[.7rem]`}>
                  {nameSplit?.at(0)}
                </Text>
                <Text styles={tw`!font-rb-swis !text-[.7rem] !leading-[.7rem]`}>
                  {nameSplit?.at(-1)}
                </Text>
              </FilterBouton>
            );
          }

          break;
      }
      // labelStyles.push(
      //   tw`flex justify-center !font-rb-swis !text-[1.25rem] !leading-[1.25rem] cursor-pointer opacity-40`,
      //   textColor,
      // );
      labelStyles.push(tw`opacity-40`);
      inputStyles.push(tw`hidden`);

      validatingStyles = isValidatingStyles && tw`opacity-100`;

      // rarityRender = data?.name;

      break;

    default:
      break;
  }

  return (
    <FormField
      inputStyles={inputStyles}
      labelStyles={[labelStyles, validatingStyles]}
      type="radio"
      name={name}
      value={data?.slug}
    >
      {rarityRender}
    </FormField>
  );
};

export default PickerTerm;
