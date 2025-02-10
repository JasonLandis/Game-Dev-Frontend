import './APIError.scss';
import { AxiosResponse } from 'axios';

interface APIErrorProps {
  error: AxiosResponse;
}

export default function APIError({ error }: APIErrorProps) {
  return (
    <div className="api-error-container">
      <div>An error occured</div>
      <div>
        <strong>Message:</strong> {error.data}
      </div>
      <div>
        <strong>Status:</strong> {error.status}
      </div>
    </div>
  );
}
