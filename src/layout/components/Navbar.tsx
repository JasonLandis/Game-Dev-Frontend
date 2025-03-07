import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';
import useAuthContext from '../../features/auth/lib/hooks/useAuth';
import '../styles/navbar.scss';

export default function Navbar() {
  const { accessToken } = useAuthContext();

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        Game Dev Blog
      </Link>
      {accessToken ? (
        <>
          <Link to="/create" className='navbar-margin-right'>
            <NavbarLink>
              Create
            </NavbarLink>
          </Link>
          <Link to="/profile">
            <NavbarLink>
              Profile
            </NavbarLink>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className='navbar-margin-right'>
            <NavbarLink>
              Login
            </NavbarLink>
          </Link>
          <Link to="/register">
            <NavbarLink>
              Register
            </NavbarLink>
          </Link>
        </>
      )}
    </div>
  );
}
