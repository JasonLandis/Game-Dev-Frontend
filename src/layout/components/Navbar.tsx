import { Link } from 'react-router-dom';
import useAuthContext from '../../features/auth/lib/hooks/useAuth';
import '../layout.scss';

export default function Navbar() {
  const { accessToken } = useAuthContext();

  return (
    <nav>
      <Link to="/" className="navbar-logo">
        Game Dev Blog
      </Link>
      {accessToken ? (
        <div>
          <Link to="/create" className="global-button">
            Create
          </Link>
          <Link to="/profile" className="global-button">
            Profile
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login" className="global-button">
            Login
          </Link>
          <Link to="/register" className="global-button">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
