import { Link } from 'react-router-dom';
import useAuthContext from '../../features/auth/lib/hooks/useAuth';
import '../styles/navbar.scss';

export default function Navbar() {
  const { accessToken } = useAuthContext();

  return (
    <nav>
      <Link to="/" className="navbar-logo">
        Game Dev Blog
      </Link>
      {accessToken ? (
        <div>
          <Link to="/create" className="navbar-link">
            Create
          </Link>
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login" className="navbar-link">
            Login
          </Link>
          <Link to="/register" className="navbar-link">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
