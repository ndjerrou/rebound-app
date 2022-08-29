import { ApiResponse } from 'apisauce';
import client from './client';
import apiWooCommerce from './wooCommerce';

const endpoint = '/wc/v3/coupons/';

export const getCoupon = (
  coupon?: string,
  onUploadProgress?: Function,
): Promise<ApiResponse<unknown, unknown>> => {
  const method = 'GET';

  const url = client.getBaseURL() + endpoint;

  const data = coupon && { code: coupon };

  const params = apiWooCommerce.authorize({
    url,
    method,
    data,
  });

  return client.get(endpoint, params, {
    onUploadProgress: (progress) =>
      onUploadProgress && onUploadProgress(progress.loaded / progress.total),
  });
};

export default { getCoupon };
