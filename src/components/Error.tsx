import { useEffect, useState } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { AxiosError } from 'axios';
import '../app/global.scss';

export default function Error(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  const [serverError, setServerError] = useState<boolean>(false);

  useEffect(() => {
    if (error instanceof AxiosError && error.response) {
      setServerError(true);
    }
  }, [error]);

  return (
    <div className="global-error-container">
      <div>An error occured</div>
      {serverError ? (
        <>
          <div className="global-error-property">
            <strong>Message:</strong> {error.response.data}
          </div>
          <div className="global-error-property">
            <strong>Status:</strong> {error.status}
          </div>
        </>
      ) : (
        <div className="global-error-property">
          <strong>Message:</strong> {error.message}
        </div>
      )}
      <button onClick={resetErrorBoundary}>Reload</button>
    </div>
  );
}
