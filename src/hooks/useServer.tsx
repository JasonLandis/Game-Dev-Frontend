import { useState, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

const { showBoundary } = useErrorBoundary();

export default function useServer(serviceFunction: ({}: any) => Promise<any>, params: any) {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const responseData = serviceFunction(params);
        if (!ignore) {
          setData(responseData)
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
