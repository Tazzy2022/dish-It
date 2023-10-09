import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div>
        <Link to="/" className="header">
          Dish iT
        </Link>
      </div>
      <div className="login-signUp-container">
        <Link to="/login" className="login-link">
          Log in
        </Link>
        <Link to="/signUp" className="signup-link">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Header;
