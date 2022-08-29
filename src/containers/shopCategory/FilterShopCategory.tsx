/* tslint:disable */
import React, {
  ComponentState,
  FC,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import styled, { AppStyledProps, css, useTheme } from 'styled-components';
import tw from 'twin.macro';
import { FormikValues } from 'formik';

import { Form, FormField, SubmitButton } from '../../components/forms';
import { Button, Container, Image, Text, List } from '../../components/html';
import { Modal } from '../../components/modal';

import { FilterShopCategoryProps } from '../../types/containers';

import { PickerTerm } from '../../components/picker';
import {
  getProductsCatByRarity,
  getProductsperiod,
} from '../../utilities/product';

const FilterBouton = styled(Container)<AppStyledProps>(({ $styles }) => [
  tw`flex items-center rounded-[40px]`,
  $styles,
]);

const FilterShopCategory: FC<FilterShopCategoryProps> = ({
  stateModal: [stateModal, setStateModal] = initialState,
  rarity = { description: '', name: '', slug: '' },
  stateItems: [, setProducts] = initialState,
}): ReactElement => {
  const {
    products: { items: products, terms },
  } = rbData;

  let stepRange;

  switch (rarity.slug) {
    case 'tout':
      stepRange = '10';

      break;

    case 'shiny':
      stepRange = '500';

      break;

    default:
      stepRange = '1';

      break;
  }

  const { backgroundColor, borderColor, buttonColor, textColor } = useTheme();

  const { category } = useParams();

  const catPeriode = `rb_gallery_${category}`;

  const filterPriceLabel = rarity?.description?.split(' - ');

  console.log(filterPriceLabel);

  if (filterPriceLabel?.length === 1) filterPriceLabel.push('');

  const minFilterPriceLabel = filterPriceLabel?.at(0);

  const maxFilterPriceLabel = filterPriceLabel?.at(-1);

  const filterPriceAttr = rarity?.description
    ?.replace(/[€+]/g, String())
    .split(' - ');

  if (filterPriceAttr?.length === 1) filterPriceAttr.push('10010');

  const minFilterPriceAttr = filterPriceAttr?.at(0);

  const maxFilterPriceAttr = filterPriceAttr?.at(-1);

  const isHype = category === 'hype';
  const isVintage = category === 'vintage';
  const isNike = category === 'nike';

  const [
    { slug: stateSlugTheme, rb_category: stateCatTheme },
    setSlugTheme,
  ]: ComponentState = useState({
    slug: false,
  });

  const filterPeriode =
    terms?.productPeriod?.filter((period) => period[catPeriode]) || [];

  const filterTheme = terms?.paTheme?.filter(
    ({ rb_category }) => rb_category === category,
  );

  filterTheme?.unshift({
    term_id: 9999,
    slug: 'tout',
  });

  console.log(filterTheme);

  const periods = filterPeriode?.map((period) => period.name);

  const allGalleryPeriodes =
    filterPeriode
      ?.map((period) =>
        Array.isArray(period[catPeriode])
          ? period[catPeriode]?.map(({ src }) => src)
          : period[catPeriode]?.src,
      )
      .flat() || [];

  const allPeriod = filterPeriode?.map((period) => ({
    period: period.name,
    src: [
      'tout',
      ...(Array.isArray(period[catPeriode])
        ? period[catPeriode].map(({ src }) => src)
        : [period[catPeriode]?.src]),
    ],
  }));

  allPeriod?.unshift({
    period: 'all',
    src: ['tout', ...allGalleryPeriodes],
  });

  const [
    { src: stateSrcPeriod, period: statePeriod },
    setSrcPeriode,
  ]: ComponentState = useState(allPeriod?.at(0));

  const [stateSrc, setSrc]: ComponentState = useState(stateSrcPeriod);

  const handleCarouselTheme = (i: number): void =>
    setSlugTheme(i ? filterTheme?.at(i) : { slug: false });

  const handleCarouselTag = (i: number): void => {
    const srcAllPeriod =
      allPeriod?.filter(({ period }) => period === statePeriod).at(0)?.src ||
      [];

    i === 0 ? setSrc(srcAllPeriod) : setSrc([stateSrcPeriod?.at(i)]);
  };

  const boutonModal =
    stateModal &&
    css`
      transform: translateX(-11rem);
      transition: transform 200ms;
    `;

  const filterStyles = stateModal
    ? [
        tw`top-[14rem] border-4`,
        css`
          transform: translateX(0);
          transition: transform 200ms;
        `,
      ]
    : [
        tw`top-64 border-[12px] opacity-50`,
        css`
          transform: translateX(34rem);
          transition: transform 200ms;
        `,
      ];

  const modalStyles = stateModal ? tw`bg-white/40 z-10` : tw`z-[-1]`;

  const renderArrowPrev = (
    clickHandler: MouseEventHandler,
    hasPrev: boolean,
    label?: boolean | string,
  ): ReactNode => {
    let arrowStyles;

    switch (label) {
      case true:
        arrowStyles = tw`top-8 left-4`;
        break;

      case 'vintage':
        arrowStyles = tw`top-6 left-2`;
        break;

      default:
        arrowStyles = tw`top-[0.1rem] left-2`;
        break;
    }

    return (
      hasPrev && (
        <Container
          styles={[tw`absolute cursor-pointer z-10`, textColor, arrowStyles]}
        >
          <AiFillCaretLeft onClick={clickHandler} />
        </Container>
      )
    );
  };

  const renderArrowNext = (
    clickHandler: MouseEventHandler,
    hasNext: boolean,
    label?: boolean | string,
  ): ReactNode => {
    let arrowStyles;

    switch (label) {
      case true:
        arrowStyles = tw`top-8 right-4`;
        break;

      case 'vintage':
        arrowStyles = tw`top-6 right-2`;
        break;

      default:
        arrowStyles = tw`top-[0.1rem] right-2`;
        break;
    }

    return (
      hasNext && (
        <Container
          styles={[tw`absolute cursor-pointer z-10`, textColor, arrowStyles]}
        >
          <AiFillCaretRight onClick={clickHandler} />
        </Container>
      )
    );
  };

  const rowHeights = new Array(terms?.paColor?.length)
    .fill(true)
    .map((e, i, a) => (a.at(-1) ? 60 : 20));

  const getItemSize = (index: number): number => rowHeights[index];

  const handleSubmit = async (
    form: FormikValues,
    { resetForm }: FormikValues,
  ): Promise<void> => {
    form.slugTheme = stateSlugTheme;

    form.slugCategoryPeriode = stateSrc;

    let filteredProducts: Product[] = getProductsCatByRarity(
      products,
      category,
      rarity.slug,
    );

    console.log('avant', filteredProducts);

    Object.entries(form).forEach(([key, val]) => {
      filteredProducts = filteredProducts?.filter((product) => {
        switch (key) {
          case 'slugCondition':
            return val
              ? product?.rb_pa_condition?.slug === val
              : product?.rb_pa_condition;

          case 'slugSize':
            return val
              ? product?.rb_pa_taille?.slug === val
              : product?.rb_pa_taille;

          case 'slugPrice':
            return parseInt(product?._sale_price || String()) <= parseInt(val);

          case 'slugTheme':
            return val
              ? product?.rb_pa_theme?.slug === val
              : product?.rb_pa_theme;

          case 'slugSingleStitch':
            return val
              ? product?.rb_pa_single_stitch?.slug === val
              : product?.rb_pa_single_stitch;

          case 'slugCategoryPeriode':
            return !isVintage ? val.includes(product?.rb_thumbnail_tag) : true;

          case 'period':
            if (!isVintage) return true;

            return val
              ? getProductsperiod(product?.rb_pa_production_year?.name) === val
              : product?.rb_pa_production_year?.name;

          case 'slugColor':
            return val
              ? product?.rb_pa_couleur?.slug === val
              : product?.rb_pa_couleur;

          default:
            return true;
        }
      });
    });

    console.log('après', filteredProducts);

    setProducts(filteredProducts);

    resetForm();

    setSrcPeriode(allPeriod?.at(0));

    console.log(form);

    setStateModal(false);
  };

  return (
    <Modal styles={modalStyles}>
      <Container
        styles={[tw`absolute top-[21rem] right-[25rem] z-20`, boutonModal]}
      >
        {stateModal && (
          <Button
            styles={[
              buttonColor,
              tw`rounded-full w-[6.5rem] h-20 border-none text-xl`,
            ]}
            onClick={(): void => setStateModal(false)}
          >
            x
          </Button>
        )}
      </Container>
      <Container
        styles={[
          tw`w-[36%] h-[38rem] pt-1 pb-4 absolute right-0 z-20 border-solid rounded-[60px] bg-white flex flex-col items-center justify-around`,
          ...filterStyles,
        ]}
      >
        <Container
          styles={[
            tw`w-[45%] h-[3.3rem] mb-[.5rem] rounded-full flex flex-col items-center border-solid border-2`,
            backgroundColor,
          ]}
        >
          <Text styles={tw`!text-white !text-[1.5rem]`}>Filtre</Text>
          <Text styles={tw`!text-white !text-[.5rem] !leading-[.5rem]`}>
            Affine ta recherche
          </Text>
          <Text styles={tw`!text-white !text-[.5rem] !leading-[.5rem]`}>
            avec notre filtre
          </Text>
        </Container>
        <Form
          initialValues={{
            slugCondition: false,
            slugSize: false,
            slugPrice: maxFilterPriceAttr,
            slugTheme: stateSlugTheme,
            slugSingleStitch: false,
            slugCategoryPeriode: stateSrc,
            period: false,
            slugColor: false,
          }}
          onSubmit={handleSubmit}
        >
          <Container styles={tw`flex h-16`}>
            <FilterBouton
              $styles={[tw`border-solid border-2 pt-[2px]`, borderColor]}
              styles={tw`flex-col`}
            >
              <Text styles={tw`!text-[.5rem] !leading-[.5rem]`}>Condition</Text>
              <List
                layout="horizontal"
                itemData={terms?.paCondition}
                height="100%"
                itemCount={terms?.paCondition?.length || 0}
                itemSize={70}
                width={200}
                containerStyles={tw`!overflow-visible flex mx-4 left-[2px]`}
              >
                <PickerTerm name="slugCondition" />
              </List>
            </FilterBouton>
            <FilterBouton
              $styles={[tw`border-solid border-2`, borderColor]}
              styles={tw`ml-2`}
            >
              <List
                layout="horizontal"
                itemData={terms?.paSize}
                height="100%"
                itemCount={terms?.paSize?.length || 0}
                itemSize={38}
                width={234}
                containerStyles={tw`flex top-[12px] left-[1px]`}
              >
                <PickerTerm name="slugSize" />
              </List>
            </FilterBouton>
          </Container>
          <FilterBouton
            $styles={[tw`border-solid border-2`, borderColor]}
            styles={tw`w-[30rem] h-[3.3rem] relative`}
          >
            <Text
              styles={[tw`relative left-4 !text-sm !font-rb-swis`, textColor]}
            >
              {minFilterPriceLabel}
            </Text>
            <FormField
              inputStyles={[
                tw`w-full h-6`,
                css`
                  overflow: hidden;
                  -webkit-appearance: none;
                  ::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    ${tw`w-4 h-4 rounded-full cursor-pointer relative bottom-2`}
                    ${backgroundColor}
                  }
                  ::-webkit-slider-runnable-track {
                    ${tw`h-0.5 bg-black`};
                  }
                  ::-moz-range-progress {
                    ${tw`bg-black`};
                  }
                  ::-moz-range-track {
                    ${tw`bg-black`};
                  }
                  ::-moz-range-thumb {
                    ${tw`w-4 h-4 rounded-full cursor-pointer`}
                    ${backgroundColor}
                  }
                `,
              ]}
              labelStyles={[tw`w-[70%] relative top-1 left-8 cursor-pointer`]}
              type="range"
              min={minFilterPriceAttr}
              max={maxFilterPriceAttr}
              name="slugPrice"
              step={stepRange}
            />
            <Text
              styles={[
                tw`relative right--10 !text-sm !font-rb-swis`,
                textColor,
              ]}
            >
              {maxFilterPriceLabel}
            </Text>
          </FilterBouton>
          <Container
            styles={[
              tw`flex w-[90%] h-[4.7rem] px-[20px]`,
              isNike ? tw`justify-between` : tw`justify-center`,
            ]}
          >
            {isNike && (
              <FilterBouton
                $styles={[tw`border-solid border-2`, borderColor]}
                styles={tw`flex flex-col p-1`}
              >
                <Text
                  styles={[
                    tw`!font-rb-swis !text-[.6rem] !leading-[.6rem] mb-3`,
                    textColor,
                  ]}
                >
                  Thèmes
                </Text>
                <Carousel
                  onChange={handleCarouselTheme}
                  showIndicators={false}
                  showThumbs={false}
                  showStatus={false}
                  width="11rem"
                  renderArrowPrev={(clickHandler, hasPrev): ReactNode =>
                    renderArrowPrev(clickHandler, hasPrev)
                  }
                  renderArrowNext={(clickHandler, hasNext): ReactNode =>
                    renderArrowNext(clickHandler, hasNext)
                  }
                >
                  {filterTheme?.map(({ term_id, slug }) => (
                    <Text
                      key={term_id}
                      styles={[tw`relative !text-[.8rem] top-4`, textColor]}
                    >
                      {slug}
                    </Text>
                  ))}
                </Carousel>
              </FilterBouton>
            )}
            <FilterBouton
              $styles={[tw`border-solid border-2`, borderColor]}
              styles={[tw`flex flex-col py-1`, !isHype ? tw`px-4` : tw`px-12`]}
            >
              <Text styles={tw`!font-rb-swis !text-[.9rem] !leading-[.9rem]`}>
                Single Stitch
              </Text>
              <List
                layout="horizontal"
                itemData={terms?.paSingleStitch}
                height="100%"
                itemCount={terms?.paSingleStitch?.length || 0}
                itemSize={100}
                width={200}
                containerStyles={tw`flex top--1 left-[2px]`}
              >
                <PickerTerm name="slugSingleStitch" />
              </List>
            </FilterBouton>
          </Container>
          <Container
            styles={[
              tw`flex w-[90%]`,
              isNike
                ? tw`justify-between pl-2 pr-[4.6rem]`
                : tw`justify-around px-[4.5rem]`,
            ]}
          >
            {isVintage ? (
              <FilterBouton
                $styles={[tw`border-solid border-2`, borderColor]}
                styles={tw`flex flex-col p-1`}
              >
                <Text
                  styles={[
                    tw`!font-rb-swis !text-[.6rem] !leading-[.6rem] mt-4 mb-1`,
                    textColor,
                  ]}
                >
                  Thèmes
                </Text>
                <Carousel
                  onChange={handleCarouselTheme}
                  showIndicators={false}
                  showThumbs={false}
                  showStatus={false}
                  width="11rem"
                  renderArrowPrev={(clickHandler, hasPrev): ReactNode =>
                    renderArrowPrev(clickHandler, hasPrev, 'vintage')
                  }
                  renderArrowNext={(clickHandler, hasNext): ReactNode =>
                    renderArrowNext(clickHandler, hasNext, 'vintage')
                  }
                >
                  {filterTheme?.map(({ slug, term_id }) => (
                    <Text
                      key={term_id}
                      styles={[
                        tw`block h-20 relative !text-[.8rem] top-10`,
                        textColor,
                      ]}
                    >
                      {slug}
                    </Text>
                  ))}
                </Carousel>
              </FilterBouton>
            ) : (
              <FilterBouton
                $styles={[tw`border-solid border-2`, borderColor]}
                styles={tw`flex flex-col pt-4`}
              >
                <Text
                  styles={[
                    tw`!font-rb-swis !text-[.9rem] !leading-[.9rem]`,
                    textColor,
                  ]}
                >
                  {isNike ? 'Tag' : 'Marque'}
                </Text>
                <Carousel
                  onChange={handleCarouselTag}
                  showIndicators={false}
                  showThumbs={false}
                  showStatus={false}
                  width="13rem"
                  renderArrowPrev={(clickHandler, hasPrev): ReactNode =>
                    renderArrowPrev(clickHandler, hasPrev, true)
                  }
                  renderArrowNext={(clickHandler, hasNext): ReactNode =>
                    renderArrowNext(clickHandler, hasNext, true)
                  }
                >
                  {stateSrcPeriod?.map((src: string) =>
                    src === 'tout' ? (
                      <Text
                        styles={[
                          tw`w-[4.5rem] h-24 relative top-[3.2rem]`,
                          textColor,
                        ]}
                        key={src}
                      >
                        {src}
                      </Text>
                    ) : (
                      <Image
                        containerStyles={tw`w-[4.5rem] h-24 relative top-[2.2rem] left-[4.25rem]`}
                        styles={tw`w-full rounded-[20px]`}
                        key={src}
                        withContainer
                        src={src}
                      />
                    ),
                  )}
                </Carousel>
              </FilterBouton>
            )}
            <FilterBouton
              $styles={[tw`border-solid border-2`, borderColor]}
              styles={tw`flex flex-col pt-2 pb-4 px-8`}
            >
              <Text
                styles={tw`!font-rb-swis !text-[.7rem] !leading-[.7rem] pb-2`}
              >
                Période
              </Text>
              {isVintage ? (
                <List
                  itemData={filterPeriode}
                  height={90}
                  itemCount={filterPeriode?.length || 0}
                  itemSize={20}
                  width="100%"
                  containerStyles={tw`!overflow-visible`}
                >
                  <PickerTerm name="period" />
                </List>
              ) : (
                periods?.map((period, i) => (
                  <Text
                    styles={[
                      tw`!font-rb-swis !text-[1.25rem] !leading-[1.25rem] cursor-pointer`,
                      statePeriod !== period &&
                        statePeriod !== 'all' &&
                        tw`opacity-40`,
                      textColor,
                    ]}
                    key={period}
                    onClick={(): void => {
                      if (period === statePeriod) {
                        setSrcPeriode(allPeriod?.at(0));
                        setSrc(allPeriod?.at(0)?.src);
                      } else {
                        setSrcPeriode(allPeriod?.at(i + 1));
                        setSrc(allPeriod?.at(i + 1)?.src);
                      }
                    }}
                  >
                    {period}
                  </Text>
                ))
              )}
            </FilterBouton>
          </Container>
          <Container styles={tw`flex flex-col items-center`}>
            <Text
              styles={tw`!font-rb-swis !text-[.9rem] !leading-[.9rem] mb-2`}
            >
              Couleurs
            </Text>
            <List
              layout="horizontal"
              itemData={terms?.paColor}
              height="3rem"
              itemCount={terms?.paColor?.length || 0}
              itemSize={40}
              width={190}
              containerStyles={tw`!overflow-visible`}
            >
              <PickerTerm name="slugColor" />
            </List>
          </Container>
          <SubmitButton
            styles={[
              tw`h-10 px-4 rounded-full border-solid border-2 border-black`,
              backgroundColor,
            ]}
            title="Appliquer"
          />
        </Form>
      </Container>
    </Modal>
  );
};

export default FilterShopCategory;
