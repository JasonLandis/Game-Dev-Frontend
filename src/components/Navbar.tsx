import { Link } from "react-router-dom";

export default function Navbar() {

  const linkStyle = {
    marginRight: '25px'
  };

  return (
    <>
      <nav>
        <Link to='/' style={linkStyle}>Home</Link>
        <Link to='/about' style={linkStyle}>About</Link>
        <Link to='/garb' style={linkStyle}>Garb</Link>
      </nav>
    </>
  );
}
