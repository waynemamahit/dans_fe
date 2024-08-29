import { useCallback, useEffect, useState } from 'react';

export default function useQuery<DataType = unknown>({
  url,
  urlParams,
  body,
  method,
  canSetData = true,
}: {
  url: string;
  urlParams?: object;
  body?: BodyInit | null;
  method?: string;
  canSetData?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType | null>(null);
  const [error, setError] = useState<unknown>(null);

  const getData = useCallback(
    async (params?: object) => {
      const urlParam =
        typeof params === 'undefined'
          ? ''
          : '?' +
            Object.entries(params)
              .map(([key, value]) => `${key}=${value}`.toLowerCase())
              .join('&');
      try {
        const response = await fetch(url + urlParam, {
          method,
          body,
        });
        if (![200, 201].includes(response.status)) throw response.body;
        const result = await response.json();
        setError(null);
        if (canSetData) setData(result);
        else return result;
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [url],
  );

  useEffect(() => {
    getData(urlParams);
  }, [getData, urlParams]);

  return {
    data,
    error,
    isLoading,
    getData,
    setData,
  };
}
