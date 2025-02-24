import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../components/Error';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './layout.scss';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main>
          <ErrorBoundary FallbackComponent={Error} key={location.pathname}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </>
  );
}
