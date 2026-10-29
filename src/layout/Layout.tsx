import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Error from '../components/Error';
import './styles/layout.scss';

export default function Layout() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Navbar menuOpen={menuOpen} toggleMenu={() => setMenuOpen((prev) => !prev)} />
      <div className="layout-container">
        <Sidebar open={menuOpen} close={() => setMenuOpen(false)} />
        <div className="layout-main">
          <ErrorBoundary FallbackComponent={Error} key={location.pathname}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
