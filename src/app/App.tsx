import { ErrorBoundary } from 'react-error-boundary';
import Error from '../components/Error';
import Router from './Router';

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Router />
    </ErrorBoundary>
  );
}
