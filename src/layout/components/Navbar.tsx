import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';
import '../styles/navbar.scss';

type TNavbarProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
};

export default function Navbar({ menuOpen, toggleMenu }: TNavbarProps) {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <button
          className={`navbar-hamburger ${menuOpen ? 'navbar-hamburger-open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="sidebar"
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" />
          <div className="navbar-logo-text">Game Dev Blog - Demo</div>
        </Link>
      </div>
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
