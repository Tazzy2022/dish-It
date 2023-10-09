import React, { useState } from "react";
import { registerUser } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await dispatch(registerUser(user));
      setUser({ username: "", email: "", password: "", city: "", state: "" });
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
    <div id="signUp-form">
      <div>
        <h2 className="form-headings">Sign Up</h2>
        <form onSubmit={signUp}>
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
          <button>Sign Up</button>
        </form>
        <div className="login-link-container">
          <p>Already have an account?</p>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
