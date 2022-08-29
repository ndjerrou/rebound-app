import { useState } from 'react';

import { UseApi } from '../types/hooks';

const useApi: UseApi = (apiFunc: Function) => {
  const [data, setData] = useState([]);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const request = async (...args: []): Promise<unknown> => {
    setLoading(true);

    const response = await apiFunc(...args);

    setError(!response.ok);

    setData(response.data);

    setLoading(false);

    return response;
  };

  return { data, error, loading, request };
};

export default useApi;
