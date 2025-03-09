import { useState, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

export default function useServer<T, P>(serviceFunction: (...params: P[]) => Promise<T>, params: P[]): T | undefined {
  const { showBoundary } = useErrorBoundary();
  const [data, setData] = useState<T>();

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const responseData = await serviceFunction(...params);
        if (!ignore) {
          setData(responseData);
        }
      } catch (error) {
        showBoundary(error);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [params, serviceFunction, showBoundary]);

  return data;
}
