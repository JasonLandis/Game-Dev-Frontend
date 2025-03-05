import { Link } from 'react-router-dom';
import '../styles/sidebar.scss';

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <Link to="/about" className="sidebar-link">
          About
        </Link>
      </div>
    </div>
  );
}
