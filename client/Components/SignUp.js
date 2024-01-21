import React, { useState } from "react";
import { registerUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ContentModal from "./ContentModal";
import { setLocation } from "../features/searchSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
    state: "",
  });
  const [error, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await dispatch(registerUser(user));
      if (loggedUser.payload.user) {
        dispatch(setLocation(user.city + ", " + user.state));
        navigate("/usersearch");
        setUser({
          username: "",
          email: "",
          password: "",
          city: "",
          state: "",
        });
      } else if (loggedUser.payload.includes(400)) {
        setErrorMessage(
          "That user already exists. Please use a different email or sign in above"
        );
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
    <div id="signUp-container">
      <h2 className="form-headings">or Sign Up</h2>
      <form id="signup-form" onSubmit={signUp}>
        <label>username:</label>
        <input
          required
          placeholder="enter your username"
          value={user.username}
          name="username"
          onChange={handleChange}
        />
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
          placeholder="enter your  password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <label>city:</label>
        <input
          required
          placeholder="enter your city"
          name="city"
          value={user.city}
          onChange={handleChange}
        />
        <label>state:</label>
        <input
          required
          placeholder="enter your state"
          name="state"
          value={user.state}
          onChange={handleChange}
        />
        <button className="button">Sign Up</button>
      </form>
      {error && (
        <ContentModal openErrorModal={setErrorModal} content={errorMessage} />
      )}
    </div>
  );
};

export default SignUp;
