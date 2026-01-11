import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';
import { useAuthContext } from '../../features/auth/auth';
import '../styles/navbar.scss';

export default function Navbar() {
  const { accessToken, loggedInUser } = useAuthContext();

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        Game Dev Blog
      </Link>
      {accessToken ? (
        <div className="navbar-links">
          <Link to="/creategame">
            <NavbarLink>Create</NavbarLink>
          </Link>
          <Link to={`/profile/${loggedInUser}`}>
            <NavbarLink>{loggedInUser}</NavbarLink>
          </Link>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/login">
            <NavbarLink>Login</NavbarLink>
          </Link>
          <Link to="/register">
            <NavbarLink>Register</NavbarLink>
          </Link>
        </div>
      )}
    </div>
  );
}
