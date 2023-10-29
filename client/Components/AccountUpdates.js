import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountModal from "./AccountModal";

const AccountUpdates = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="user-account-h1">Update account info</h1>
      <section className="user-section">
        <div className="useracc-info">
          <p>username:</p>
          <p>{auth.user.username}</p>
        </div>
        <div className="account-Btn-container">
            <AccountModal name="username" />
        </div>
      </section>
      <section className="user-section">
        <div className="useracc-info">
          <p>email:</p>
          <p>{auth.user.email}</p>
        </div>
        <div className="account-Btn-container">
         <AccountModal name="email" />
        </div>
      </section>
      <section className="user-section">
        <div className="useracc-info">
          <p>password:</p>
          <p>*******</p>
        </div>
        <div className="account-Btn-container">
                      <AccountModal name="password" />
        </div>
      </section>
      <section className="user-section">
        <div className="useracc-info">
          <p>city:</p>
          <p>{auth.user.city}</p>
        </div>
        <div className="account-Btn-container">
          <AccountModal name="city" />
        </div>
      </section>
      <section className="user-section">
        <div className="useracc-info">
          <p>state:</p>
          <p>{auth.user.state}</p>
        </div>
        <div className="account-Btn-container">
          <AccountModal name="state"/>
        </div>
      </section>
    </div>
  );
};

export default AccountUpdates;
