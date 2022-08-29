import logoCartQuantity0 from '../assets/images/cart/0_ca.png';
import logoCartQuantity1 from '../assets/images/cart/1_ca.png';
import logoCartQuantity2 from '../assets/images/cart/2_ca.png';
import logoCartQuantity3 from '../assets/images/cart/3_ca.png';
import logoCartQuantity4 from '../assets/images/cart/4_ca.png';
import logoCartQuantity5 from '../assets/images/cart/5_ca.png';
import logoCartQuantity6 from '../assets/images/cart/6_ca.png';
import logoCartQuantity7 from '../assets/images/cart/7_ca.png';
import logoCartQuantity8 from '../assets/images/cart/8_ca.png';
import logoCartQuantity9 from '../assets/images/cart/9_ca.png';

export const checkProductInCart: CheckProductInCart<Product> = (id, cart) => {
  const productInCart = cart?.find((p) => p.ID === id);

  return !!productInCart;
};

export const getImageCartQuantity = (count: number): string => {
  switch (count) {
    case 1:
      return logoCartQuantity1;

    case 2:
      return logoCartQuantity2;

    case 3:
      return logoCartQuantity3;

    case 4:
      return logoCartQuantity4;

    case 5:
      return logoCartQuantity5;

    case 6:
      return logoCartQuantity6;

    case 7:
      return logoCartQuantity7;

    case 8:
      return logoCartQuantity8;

    case 9:
      return logoCartQuantity9;

    default:
      return logoCartQuantity0;
  }
};
