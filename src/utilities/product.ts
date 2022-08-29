import breaktee from '../assets/images/rarity/breaktee.png';
import diamondtee from '../assets/images/rarity/diamondtee.png';
import epictee from '../assets/images/rarity/epictee.png';
import goldtee from '../assets/images/rarity/goldtee.png';
import mastertee from '../assets/images/rarity/mastertee.png';
import reboundtee from '../assets/images/rarity/reboundtee.png';
import shiny from '../assets/images/rarity/shiny.png';

export const getRarity = (rbPaRarity?: string): string => {
  let ImageRarity;

  switch (rbPaRarity) {
    case 'reboundtee':
      ImageRarity = reboundtee;

      break;
    case 'breaktee':
      ImageRarity = breaktee;

      break;
    case 'epictee':
      ImageRarity = epictee;

      break;
    case 'goldtee':
      ImageRarity = goldtee;

      break;
    case 'diamondtee':
      ImageRarity = diamondtee;

      break;
    case 'mastertee':
      ImageRarity = mastertee;

      break;
    case 'shiny':
      ImageRarity = shiny;

      break;

    default:
      ImageRarity = '';

      break;
  }

  return ImageRarity;
};

export const getProductsCatByRarity = (
  products?: Product[],
  category?: string,
  rarity?: string,
): Product[] => {
  const filterProducts = products
    ?.filter(({ rb_product_cat, rb_pa_rarete }) => {
      if (rarity && rarity !== 'tout')
        return (
          rb_pa_rarete?.slug === rarity && rb_product_cat?.slug === category
        );
      return rb_pa_rarete?.slug && rb_product_cat?.slug === category;
    })
    .sort((product) => (product.rb_product_tag ? -1 : 1));

  return filterProducts || [];
};

export const getProductsperiod = (productYear?: string): string => {
  const year = parseInt(productYear || '');

  let period;

  switch (Boolean(year)) {
    case year >= 1970 && year < 1979:
      period = "70's";

      break;

    case year >= 1900 && year < 1989:
      period = "80's";

      break;

    case year >= 1990 && year < 1999:
      period = "90's";

      break;

    case year >= 2000 && year < 2009:
      period = "00's";

      break;

    case year >= 2010 && year < 2019:
      period = "10's";

      break;

    default:
      period = '';
      break;
  }

  return period;
};
