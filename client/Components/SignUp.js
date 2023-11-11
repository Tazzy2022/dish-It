import React, { useState } from "react";
import { registerUser } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
    state: "",
  });
  const navigate = useNavigate();

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await dispatch(registerUser(user));
      //navigate only when user is accurate
      if (loggedUser.payload.user) navigate("/usersearch");
    } catch (err) {
      console.log(err);
    }
    setUser({ username: "", email: "", password: "", city: "", state: "" });
  };
  
  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div id="signUp-container">
      <h2 className="form-headings">or Sign Up</h2>
      <form id="signup-form" onSubmit={signUp}>
        <label>username:</label>
        <input
          placeholder="enter your username"
          value={user.username}
          name="username"
          onChange={handleChange}
        />
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
          placeholder="enter your  password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <label>city:</label>
        <input
          placeholder="enter your city"
          name="city"
          value={user.city}
          onChange={handleChange}
        />
        <label>state:</label>
        <input
          placeholder="enter your state"
          name="state"
          value={user.state}
          onChange={handleChange}
        />
        <button className="button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
