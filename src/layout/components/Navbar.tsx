import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';
import useAuthContext from '../../features/auth/lib/hooks/useAuth';
import '../styles/navbar.scss';

export default function Navbar() {
  const { accessToken, username } = useAuthContext();

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        Game Dev Blog
      </Link>
      {accessToken ? (
        <>
          <Link to="/creategame" className="navbar-margin-right">
            <NavbarLink>Create</NavbarLink>
          </Link>
          <Link to={`/profile/${username}`}>
            <NavbarLink>{username}</NavbarLink>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-margin-right">
            <NavbarLink>Login</NavbarLink>
          </Link>
          <Link to="/register">
            <NavbarLink>Register</NavbarLink>
          </Link>
        </>
      )}
    </div>
  );
}
