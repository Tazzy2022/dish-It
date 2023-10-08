import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  return (
    <Nav className="d-flex mb-3">
      <Navbar.Brand className="me-auto p-2 header" href="/">
        Dish iT
      </Navbar.Brand>

      <Nav.Link className="p-2 login-link">Log in</Nav.Link>

      <Nav.Link className="p-2 signup-link">Sign up</Nav.Link>
    </Nav>
  );
};

export default Header;
