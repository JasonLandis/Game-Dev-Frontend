import { useState, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TGame } from '../../../../game-dev-shared/src/games';

export default function useServer(serviceFunction: () => Promise<TGame[]>) {
  const { showBoundary } = useErrorBoundary();
  const [data, setData] = useState<TGame[]>([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const responseData = await serviceFunction();
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
  }, [serviceFunction, showBoundary]);

  return data;
}
