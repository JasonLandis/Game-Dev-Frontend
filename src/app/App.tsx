import { ErrorBoundary } from 'react-error-boundary';
import Error from '../components/Error';
import Provider from "./Provider";
import Router from "./Router";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Provider>        
        <Router />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
