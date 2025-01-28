import { Link } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </nav>
    </>
  );
}
