import { useState } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { AxiosError } from 'axios';
import './components.scss';

function Error(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  const [serverError, setServerError] = useState<boolean>(false);

  if (error instanceof AxiosError && error.response) {
    setServerError(true);
  }

  return (
    <div className="error-container">
      <div>An error occured</div>
      { serverError ? (
        <>
          <strong>Message:</strong> {error.message}
        </>
      ) : (
        <>
          <strong>Message:</strong> {error.response}
          <strong>Status:</strong> {error.status}
        </>
      )}
      <button onClick={resetErrorBoundary}>Reload</button>
    </div>
  );
}

export default Error;
