import React from "react";
import { useSelector } from "react-redux";

const AccountHome = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="user-account-h1">{auth.user.username}'s account</h1>
      <img
        className="profile-img"
        src={auth.user.imageUrl}
        alt="personal image"
      />
      <button>+</button>
      <label>update image</label>
      <p>pending follow requests:</p>
      <section className="follow-req-container"></section>
    </div>
  );
};

export default AccountHome;
