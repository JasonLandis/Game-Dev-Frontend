import { Link } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import '../styles/sidebar.scss';

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <Link to="/about">
          <SidebarLink>About</SidebarLink>
        </Link>
      </div>
    </div>
  );
}
