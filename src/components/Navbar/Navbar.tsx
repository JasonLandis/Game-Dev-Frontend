import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import './Navbar.scss';

export default function Navbar() {
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
