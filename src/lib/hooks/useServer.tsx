import { useState, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';



export default function useServer<T>(serviceFunction: () => Promise<T>) {
  const { showBoundary } = useErrorBoundary();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const responseData = serviceFunction(params);
        if (!ignore) {
          setData(responseData);
        }
      } catch (error) {
        showBoundary(error);
      }

      return () => {
        ignore = true;
      };
    })();
  }, []);

  return data;
}
