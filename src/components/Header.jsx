import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logoLink">
          <img
            src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/286ebfc6c07d6a38969da05b673b21be6e89eab3/book-my-hotel-logo.svg"
            alt="Book My Hotel"
            className="logo"
          />
        </Link>
        <div className="navLinks">
          <Link to="/" className="navLink">
            Home
          </Link>
          <Link to="/hotels" className="navLink">
            Hotels
          </Link>
          <Link to="/places" className="navLink">
            Places
          </Link>
        </div>
      </nav>
      <div className="signIn">Sign in</div>
    </header>
  );
}
