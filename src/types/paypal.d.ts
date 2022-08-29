import {
  Address,
  AmountWithBreakdown,
  OnApproveActions,
  OnApproveData,
  OrderApplicationContext,
  PurchaseItem,
} from '@paypal/paypal-js';
import { FormikValues } from 'formik';

declare module '@paypal/react-paypal-js' {
  export interface FullName {
    full_name: string;
  }

  export interface NationalNumber {
    national_number: string;
  }

  export interface Shipping {
    name: FullName;
    email_address: string;
    phone_number: NationalNumber;
    type: string;
    address: Address;
  }

  export interface PurchaseUnit {
    amount: AmountWithBreakdown;
    items?: PurchaseItem[];
    shipping?: Shipping;
  }

  export interface OrderPayPal {
    application_context?: OrderApplicationContext;
    purchase_units: PurchaseUnit[];
  }

  export type GetOrderPayPal = (
    products: Product[],
    userInfo: FormikValues,
    discount: Discount,
  ) => OrderPayPal;

  export type GetAddressPayPal = (userInfo: FormikValues) => Shipping;

  export interface OnApproveDataApp extends OnApproveData {
    paymentSource?: string;
  }

  export type OnApprove = (
    data: OnApproveDataApp,
    actions: OnApproveActions,
  ) => Promise<void>;
}
