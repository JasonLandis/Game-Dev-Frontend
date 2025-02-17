import { Link } from 'react-router-dom';
import useAuthContext from '../features/auth/lib/hooks/useAuth';
import './components.scss';

function Navbar() {
  const { accessToken } = useAuthContext();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      { accessToken ? (
        <div>
          <Link to="/create">Create</Link>
          <Link to="/profile">Profile</Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
