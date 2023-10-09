import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

const App = () => {
  return (
    <div>
      <nav>
        <Header />
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
