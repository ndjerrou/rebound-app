import { createContext } from 'react';

import { UseApiResponse } from '../types/hooks';

const defaultContext: CartContextType<Product> = {
  cart: [],
  createOrderApi: {} as UseApiResponse,
  discount: {} as Discount,
  totalPrice: 0,
  addProductToCart: () => {},
  getDiscount: async () => {},
  removeProductFromCart: () => {},
};

const CartContext = createContext(defaultContext);

export default CartContext;
