import React, { useState } from "react";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ContentModal from "./ContentModal";
import { setLocation } from "../features/searchSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await dispatch(loginUser(user));
      if (loggedUser.payload.user) {
        dispatch(setLocation(loggedUser.payload.user.city));
        navigate("/usersearch");
        setUser({ email: "", password: "" });
      } else {
        setErrorMessage("incorrect email or password");
        setErrorModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div id="login-container">
      <h2 className="form-headings">Login</h2>
      {error && (
        <ContentModal openErrorModal={setErrorModal} content={errorMessage} />
      )}
      <form id="login-form" onSubmit={login}>
        <label>email:</label>
        <input
          required
          type="email"
          placeholder="enter your email"
          value={user.email}
          name="email"
          onChange={handleChange}
        />
        <label>password:</label>
        <input
          required
          type="password"
          placeholder="enter your password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
