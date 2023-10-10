import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  console.log("auth.user.id", auth.user.id);

  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  return (
    <div className="header-container">
      <nav>
        <Link to="/" className="header">
          Dish iT
        </Link>
      </nav>
      {auth.user.id ? (
        <nav className="nav-dropdown-container">
          <button className="dropbtn">{auth.user.username}'s account</button>
          <div className="dropdown-content">
            <Link to="/userlists">my lists</Link>
            <Link to="/usersearch">search for restaurant</Link>
            <Link to="/useraccount">my account</Link>
            <Link to="/">log out</Link>
          </div>
        </nav>
      ) : (
        <nav className="login-signUp-container">
          <Link to="/login" className="login-link">
            Log in
          </Link>
          <Link to="/signUp" className="signup-link">
            Sign up
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Header;
