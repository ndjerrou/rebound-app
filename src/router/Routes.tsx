import React, { FC, useContext, useEffect } from 'react';
import {
  Routes as RoutesDOM,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Home from '../views/Home';
import Lookbook from '../views/Lookbook';
import MainLayout from '../layouts/MainLayout';
import NotFoundPage from '../views/NotFoundPage';
import Product from '../views/Product';
import Shop from '../views/Shop';
import ShopCategory from '../views/ShopCategory';
import Video from '../views/Video';
import Checkout from '../views/Checkout';
import { CartContext } from '../contexts';
import { scrollTo } from '../utilities/functions';

const Routes: FC = () => {
  const { cart } = useContext(CartContext);

  const isEmptyCart = cart.length === 0;

  const { pathname } = useLocation();

  useEffect(() => {
    scrollTo(0, 'auto');
  }, [pathname]);

  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route element={<MainLayout />}>
        <Route path="/video" element={<Video />} />
        <Route path="/lookbook" element={<Lookbook />} />
        <Route path="/shop/:category/products/:id" element={<Product />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/shop/:category/products" element={<ShopCategory />} />
      <Route path="/shop" element={<Shop />} />
      <Route
        path="/checkout"
        element={isEmptyCart ? <Navigate to="/shop" replace /> : <Checkout />}
      />
    </RoutesDOM>
  );
};

export default Routes;
