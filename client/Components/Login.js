import React, { useState } from "react";
import { loginUser } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await dispatch(loginUser(user));
      setUser({ email: "", password: "" });
      //navigate only when user is accurate
      if (loggedUser.payload) navigate("/userhome");
      console.log(loggedUser.payload);
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
      <form id="login-form" onSubmit={login}>
        <label>email:</label>
        <input
				type="email"
          placeholder="enter your email"
          value={user.email}
          name="email"
          onChange={handleChange}
        />
        <label>password:</label>
        <input
          type="password"
          placeholder="enter your password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button className="button">Login</button>
      </form>
      <div className="sign-up-link-container">
        <p>Don't have an account?
        <Link to="/signUp">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
