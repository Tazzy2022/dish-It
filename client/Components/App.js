import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import UserHome from "./UserHome";
import RestaurantList from "./RestaurantList";

const App = () => {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />

        <Route exact path="/userhome" element={<UserHome />} />
        <Route exact path="/userlists/:id" element={<RestaurantList />} />
      </Routes>
    </>
  );
};

export default App;
