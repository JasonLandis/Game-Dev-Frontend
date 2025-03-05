import { Link } from 'react-router-dom';
import '../layout.scss';

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <Link to="/about" className="global-button sidebar-button">
          About
        </Link>
      </div>
    </div>
  );
}
