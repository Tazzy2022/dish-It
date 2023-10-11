import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import UserHome from "./UserHome";
import UserSingleList from "./UserSingleList";

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
        <Route exact path="/userlists/:id" element={<UserSingleList />} />
      </Routes>
    </>
  );
};

export default App;
