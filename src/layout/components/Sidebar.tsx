import { Link } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import '../styles/sidebar.scss';

type TSidebarProps = {
  open: boolean;
  close: () => void;
};

export default function Sidebar({ open, close }: TSidebarProps) {
  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'sidebar-backdrop-open' : ''}`} onClick={close} />
      <div id="sidebar" className={`sidebar-container ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          <Link to="/about">
            <SidebarLink>About</SidebarLink>
          </Link>
          <div className="sidebar-mobile-links">
            <Link to="/login">
              <SidebarLink>Login</SidebarLink>
            </Link>
            <Link to="/register">
              <SidebarLink>Register</SidebarLink>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
