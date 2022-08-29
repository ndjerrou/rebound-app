import { ApiResponse } from 'apisauce';

import apiWooCommerce from './wooCommerce';
import client from './client';

const endpoint = '/wc/v3/orders/';

export const createOrder = (
  data: unknown,
  onUploadProgress?: Function,
): Promise<ApiResponse<unknown, unknown>> => {
  const method = 'POST';

  const url = client.getBaseURL() + endpoint;

  const params = apiWooCommerce.authorize({
    url,
    method,
  });

  return client.post(endpoint, data, {
    params,
    onUploadProgress: (progress) =>
      onUploadProgress && onUploadProgress(progress.loaded / progress.total),
  });
};

export default { createOrder };
