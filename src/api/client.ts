import { ApiResponse, create } from 'apisauce';

const apiClient = create({
  baseURL: process.env.REACT_APP_HOST_REST_API,
});

const { get } = apiClient;
apiClient.get = async (
  url,
  params,
  axiosConfig,
): Promise<ApiResponse<any, any>> => {
  const response = await get(url, params, axiosConfig);

  return response;
};

export default apiClient;
