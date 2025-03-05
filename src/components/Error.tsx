import { FallbackProps } from 'react-error-boundary';
import { AxiosError } from 'axios';
import Button from './Button';
import './styles/Error.scss';

export default function Error(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;

  let serverError = false;
  if (error instanceof AxiosError && error.response) {
    serverError = true;
  }

  return (
    <div className="error-container">
      <div>An error occured</div>
      {serverError ? (
        <>
          <div className="error-property">
            <strong>Message:</strong> {error.response.data}
          </div>
          <div className="error-property">
            <strong>Status:</strong> {error.status}
          </div>
        </>
      ) : (
        <div className="error-property">
          <strong>Message:</strong> {error.message}
        </div>
      )}
      <Button eventHandler={resetErrorBoundary}>Reload</Button>
    </div>
  );
}
