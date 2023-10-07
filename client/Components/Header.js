import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div>
        <Link to="/">
          <h1 id="header">Dish iT</h1>
        </Link>
      </div>
      <div id="login-signUp-container">
        <Link id="login-link">Log in</Link>
        <Link id="signup-link">Sign up</Link>
      </div>
    </div>
  );
};

export default Header;
