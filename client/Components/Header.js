import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div id="header">
        <Link>
          <h1>Dish iT</h1>
        </Link>
      </div>
      <div id="login-signUp-container">
        <Link>Log in</Link>
        <Link id="signup-link">Sign up</Link>
      </div>
    </div>
  );
};

export default Header;
