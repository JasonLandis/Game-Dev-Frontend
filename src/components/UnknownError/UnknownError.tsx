import './UnknownError.scss';
import { FallbackProps } from 'react-error-boundary';

export default function UnknownError(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;

  return (
    <div className="global-page-container">
      <div className="unknown-error-container">
        <div>An error occured</div>
        <div>
          <strong>Message:</strong> {error.message}
        </div>
        <button onClick={resetErrorBoundary}>Reload</button>
      </div>
    </div>
  );
}
