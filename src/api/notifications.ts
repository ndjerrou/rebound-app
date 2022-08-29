import { ApiResponse } from 'apisauce';
import client from './client';
import apiWooCommerce from './wooCommerce';

const endpoint = '/rb/v1/notifications/';

export const createNotification = (
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

export default { createNotification };
