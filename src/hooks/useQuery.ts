import { useCallback, useEffect, useState } from 'react';

export default function useQuery<Data = unknown>(
  url: string,
  body?: BodyInit | null,
  method?: string,
) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<unknown>(null);

  const getData = useCallback(async () => {
    try {
      const response = await fetch(url, {
        method,
        body,
      });
      if (![200, 201].includes(response.status)) throw response.body;
      setData(await response.json());
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    error,
    isLoading,
    getData,
  };
}
