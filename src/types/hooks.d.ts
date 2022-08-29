import { ReactNode } from 'react';

export interface UseApiResponse {
  data: never[];
  error: boolean;
  loading: boolean;
  request: Function;
}

export type UseApi = (apiFunc: Function) => UseApiResponse;

export interface UsePortalProps {
  children: ReactNode;
  id?: string;
  el?: string;
}
