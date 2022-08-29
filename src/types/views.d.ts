import { ForwardedRef } from 'react';

export interface Refs {
  [key: string]: ForwardedRef<HTMLDivElement>;
}

export interface Views {
  customRef?: ForwardedRef<HTMLDivElement>;
  refs?: Refs;
}
