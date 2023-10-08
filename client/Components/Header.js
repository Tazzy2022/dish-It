import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div>
        <Link className="header">Dish iT</Link>
      </div>
      <div className="login-signUp-container">
        <Link className="login-link">Log in</Link>
        <Link className="signup-link">Sign up</Link>
      </div>
    </div>
  );
};

export default Header;
