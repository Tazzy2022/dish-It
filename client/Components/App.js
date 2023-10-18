import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import AuthContainer from "./AuthContainer";
import Home from "./Home";
import UserHome from "./UserHome";
import UserSingleList from "./UserSingleList";
import Search from "./Search";
import FilterCategorySearch from "./FilterCategorySearch";

const App = () => {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<AuthContainer />} />

        <Route exact path="/usersearch" element={<Search />} />
        <Route exact path="/userhome" element={<UserHome />} />
        <Route exact path="/userlists/:id" element={<UserSingleList />} />

        {/* <Route exact path="/useraccount" element={<FilterCategorySearch />} /> */}

        <Route exact path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
