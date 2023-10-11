import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedoutUser } from "../features/authSlice";
import { loggoutUserLists } from "../features/listSlice";

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("CLICKED");
    dispatch(loggedoutUser());
    dispatch(loggoutUserLists());
  };

  return (
    <div className="header-container">
      <nav>
        <Link to="/" className="header">
          Dish iT
        </Link>
      </nav>
      {auth?.user.id ? (
        <nav className="nav-dropdown-container">
          <button className="dropbtn">{auth.user.username}'s account</button>
          <div className="dropdown-content">
            <Link to="/userhome">my lists</Link>
            <Link to="/usersearch">search for restaurants</Link>
            <Link to="/useraccount">my account</Link>
            <Link onClick={handleLogout} to="/">
              log out
            </Link>
          </div>
        </nav>
      ) : (
        <nav className="login-signUp-container">
          <Link to="/login" className="login-link">
            Log in
          </Link>
          <Link to="/" className="signup-link">
            Sign up
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Header;
