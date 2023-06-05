//imports
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const toggleNavbar = () => {
    const links = document.getElementsByClassName("navbar-links")[0];
    links.classList.toggle("active");
  };

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        <img src={logo} alt="logo" />
      </Link>
      <Link className="toggle-button" onClick={() => toggleNavbar()}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </Link>
      <div className="navbar-links">
        <ul>
          <li>
            <Link to="/">ACCUEIL</Link>
          </li>
          <li>
            <Link to="/search">RECHERCHE</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
