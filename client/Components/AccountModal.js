import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../features/authSlice";

const AccountModal = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);

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

  const updateUser = async (e) => {
    e.preventDefault();
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
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>edit</button>
      {modalOpen && (
        <div className="modalBackground">
          <main className="new-list-modal">
            <div className="close-modal">
              <button className="modalX" onClick={() => setModalOpen(false)}>
                X
              </button>
            </div>
            <form className="create-list-form" onSubmit={updateUser}>
              <label>new {props.name} :</label>
              <input
                id="line-input"
                type="text"
                name={props.name}
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
      )}
    </div>
  );
};

export default AccountModal;
