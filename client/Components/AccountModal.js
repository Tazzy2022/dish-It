import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../features/authSlice";

const AccountModal = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const key = Object.keys(props);
  //const key = Object.keys(props).toString();
  console.log("KEY", key[0]);
  //console.log("KEY.slice", key.slice(0,1));

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateUser = async () => {
    e.preventDefault();
    openModal(false);
    dispatch(
      updateUserInfo({
        ...auth.user,
        username: user.username || auth.user.username,
        email: user.email || auth.user.email,
        password: user.password || auth.user.password,
        city: user.city || auth.user.city,
        state: user.state || auth.user.state,
        token: auth.token,
      })
    );
  };

  console.log("PROPS", props);
  return (
    <div className="modalBackground">
      <main className="new-list-modal">
        <div id="close-modal">
          <button className="modalX" onClick={() => props.openModal(false)}>
            X
          </button>
        </div>
        <form className="create-list-form" onSubmit={updateUser}>
          <label>new {key[0]} :</label>
          <input
            id="line-input"
            type="text"
            name={key[0]}
            value={user.value}
            onChange={handleChange}
          />
          <div>
            <button className="modalbtn" type="submit">
              update
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AccountModal;
