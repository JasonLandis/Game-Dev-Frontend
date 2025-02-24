import { Link } from 'react-router-dom';
import useAuthContext from '../../features/auth/lib/hooks/useAuth';
import '../layout.scss';

export default function Navbar() {
  const { accessToken } = useAuthContext();

  return (
    <nav>
      <Link to="/">Game Dev Blog</Link>
      {accessToken ? (
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
