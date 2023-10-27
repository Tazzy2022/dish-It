import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import AuthContainer from "./AuthContainer";
import Home from "./Home";
import UserHome from "./UserHome";
import UserSingleList from "./UserSingleList";
import Search from "./Search";
import UserAccount from "./UserAccount";
import Following from "./Following";
import Followers from "./Followers";
import AccountSideNav from "./AccountSideNav";
import UpdateAccount from "./UpdateAccount";

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

        <Route exact path="/accountnav" element={<AccountSideNav />}>
          <Route exact path="/updateAccount" element={<UpdateAccount />} />
          <Route exact path="/account" element={<UserAccount />} />
          <Route exact path="/followers" element={<Followers />} />
          <Route exact path="/following" element={<Following />} />
        </Route>
        <Route exact path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
