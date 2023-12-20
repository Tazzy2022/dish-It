import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedoutUser } from "../features/authSlice";
import { loggoutUserLists } from "../features/listSlice";
import { clearSearch } from "../features/searchSlice";
import { clearRestos } from "../features/allRestaurantsSlice";

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(loggedoutUser());
    dispatch(loggoutUserLists());
    dispatch(clearSearch());
    dispatch(clearRestos());
    dispatch(logoutFriends());
  };

  return (
    <div className="header-container">
      <nav>
        {auth?.user?.id ? (
          <Link to="/usersearch" className="header">
            Dish-it
          </Link>
        ) : (
          <Link to="/" className="header">
            Dish-it
          </Link>
        )}
      </nav>
      {auth?.user?.id && (
        <nav className="nav-dropdown-container">
          <button className="dropbtn">{auth.user.username}'s account</button>
          <div className="dropdown-content">
            <Link to="/userhome">my lists</Link>
            <Link to="/usersearch">search for restaurants</Link>
            <Link to="/account">account info</Link>
            <Link onClick={handleLogout} to="/">
              log out
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Header;
