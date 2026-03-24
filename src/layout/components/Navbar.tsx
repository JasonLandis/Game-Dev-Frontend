import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';
import '../styles/navbar.scss';

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        Game Dev Blog - Demo
      </Link>
      <div className="navbar-links">
        <Link to="/login">
          <NavbarLink>Login</NavbarLink>
        </Link>
        <Link to="/register">
          <NavbarLink>Register</NavbarLink>
        </Link>
      </div>
    </div>
  );
}
