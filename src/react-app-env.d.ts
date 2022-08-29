/* eslint-disable no-unused-vars */
/// <reference types="@devloco/react-scripts-wptheme" />

import { OrderPayPal } from '@paypal/react-paypal-js';
import { ApiResponse } from 'apisauce';
import { FormikValues } from 'formik';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { AppStyled } from 'styled-components';

import { UseApiResponse } from './types/hooks';

declare global {
  declare interface AppStylesProps {
    styles?: AppStyled;
  }
  declare interface ProductPeriode {
    [key: string]: [{ id?: string; src?: string }] & {
      id?: string;
      src?: string;
    };
    name?: string;
  }
  declare interface Term {
    term_id?: number;
    slug?: string;
    name?: string;
    description?: string;
    taxonomy?: string;
    mn_thumbnail_id?: { id?: string; src?: string };
    rb_banner?: { id?: string; src?: string };
    rb_category?: string;
    rb_gallery_id?: [{ id?: string; src?: string }];
    rb_gallery_vintage?: { id?: string; src?: string };
    rb_gallery_nike?: { id?: string; src?: string };
    rb_gallery_hype?: { id?: string; src?: string };
    rb_icon_button?: { id?: string; src?: string };
    rb_icon_filter?: { id?: string; src?: string };
    rb_icon_podium?: { id?: string; src?: string };
    thumbnail_id?: { id?: string; src?: string };
  }

  declare interface LookBook {
    ID?: number;
    post_name?: string;
    post_status?: string;
    post_title?: string;
    post_type?: string;
    rb_category?: Term;
    rb_cover?: string;
    rb_gallery?: { id?: string; src?: string }[];
    rb_tag?: Term;
  }

  declare interface Product {
    ID?: number;
    post_name?: string;
    post_status?: string;
    post_title?: string;
    post_type?: string;
    rb_cover?: string;
    rb_gallery?: [{ id?: string; src?: string }];
    rb_marcket_price?: string;
    rb_podium?: Term;
    rb_product_cat?: Term;
    rb_profit?: string;
    rb_pa_condition?: Term;
    rb_pa_couleur?: Term;
    rb_pa_mensurations?: Term;
    rb_pa_rarete?: Term;
    rb_pa_periode?: Term;
    rb_pa_production_year?: Term;
    rb_pa_single_stitch?: Term;
    rb_pa_taille?: Term;
    rb_pa_theme?: Term;
    rb_product_tag?: Term;
    rb_thumbnail_tag?: string;
    _regular_price?: string;
    _sale_price?: string;
  }

  declare type State<P> = [P, Dispatch<SetStateAction<P>>];

  declare interface Products {
    items?: Product[];
    stateItems?: State<Product[]>;
    terms?: {
      paCondition?: Term[];
      paRarity?: Term[];
      paSize?: Term[];
      paSingleStitch?: Term[];
      paTheme?: Term[];
      paColor?: Term[];
      productCat?: Term[];
      productPeriod?: ProductPeriode[];
    };
  }

  declare interface Provider {
    lookbooks: LookBook[];
    products: Products;
    videos: [];
    wantToBuys: [];
    socialNetworks: string[];
    payPalClientId: string;
  }

  declare interface ShippingWP {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  }

  declare interface BillingWP extends ShippingWP {
    email: string;
    phone: string;
  }

  declare interface OrderWP {
    status: string;
    payment_method: string;
    payment_method_title: string;
    set_paid: boolean;
    billing: BillingWP;
    shipping: ShippingWP;
    line_items: {
      product_id: number;
      quantity: number;
      subtotal?: string;
      total: string;
    }[];
    coupon_lines: {
      code: string;
    }[];
  }

  declare interface Discount {
    amount: string;
    code?: string;
    discount_type: 'percent' | 'fixed_cart' | 'fixed_product';
    usage_count: number;
    usage_limit: number;
  }

  export type FormatCoupon = (
    discount: Discount,
    totalPrice: number,
  ) => { newTotalPrice: string; totalDiscount: string };

  export type GetOrderWP = (
    products: Product[],
    userInfo: FormikValues,
    discount: Discount,
    paymentMethod: string,
  ) => OrderWP;

  declare type GetAddressWP = (userInfo: FormikValues) => {
    shipping: ShippingWP;
    billing: BillingWP;
  };

  declare type AddProductToCart<P> = (item: P) => void;

  declare type CheckProductInCart<P> = (id: P['ID'], cart: P[]) => boolean;

  declare type GetDiscount = (coupon: string) => Promise<never, never>;

  declare type RemoveProductToCart<P> = (item: P) => void;

  declare interface CartContextType<P> {
    cart: P[];
    createOrderApi: UseApiResponse;
    discount: Discount;
    totalPrice: number;
    addProductToCart: AddProductToCart<P>;
    getDiscount: GetDiscount;
    removeProductFromCart: RemoveProductToCart<P>;
  }

  declare interface CartContextProps {
    children: ReactNode;
  }

  declare const initialState: State;

  declare const isAdmin: boolean;

  declare const rbData: Provider;
}
