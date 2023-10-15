import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthContainer = () => {
  return (
    <main id="auth-container">
      <Login />
      <SignUp />
    </main>
  );
};
export default AuthContainer;
