import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";

const App = () => {
  return (
    <div>
      <nav>
        <Header />
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
