import { Link } from 'react-router-dom';
import '../layout.scss';

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <Link to="/about">About</Link>
      </div>
    </div>
  );
}
