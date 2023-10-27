import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountModal from "./AccountModal"

const AccountUpdates = () => {
  const auth = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <h1 className="user-account-h1">Update account info</h1>
      <section className="user-section">
        <div className="useracc-info">
          <p>username:</p>
          <p>{auth.user.username}</p>
        </div>
        <div className="account-Btn-container">
          <button className="openModalBtn" onClick={() => setModalOpen(true)}>
            edit
          </button>
          {modalOpen && (
            <AccountModal
              username={auth.user.username}
              openModal={setModalOpen}
            />
          )}
        </div>
      </section>
      <section className="user-section">
        <div className="useracc-info">
          <p>email:</p>
          <p>{auth.user.email}</p>
        </div>
        <div className="account-Btn-container">
          <button className="openModalBtn" onClick={() => setModalOpen(true)}>
            edit
          </button>
          {modalOpen && (
            <AccountModal email={auth.user.email} openModal={setModalOpen} />
          )}
        </div>
      </section>
      <section className="user-section">
        <div className="useracc-info">
          <p>password:</p>
          <p>*******</p>
        </div>
        <div className="account-Btn-container">
          <button className="openModalBtn" onClick={() => setModalOpen(true)}>
            edit
          </button>
          {modalOpen && (
            <AccountModal
              password={auth.user.password}
              openModal={setModalOpen}
            />
          )}
        </div>
      </section>
      <section className="user-section">
        <div className="useracc-info">
          <p>city:</p>
          <p>{auth.user.city}</p>
        </div>
        <div className="account-Btn-container">
          <button className="openModalBtn" onClick={() => setModalOpen(true)}>
            edit
          </button>
          {modalOpen && (
            <AccountModal city={auth.user.city} openModal={setModalOpen} />
          )}
        </div>
      </section>
      <section className="user-section">
        <div className="useracc-info">
          <p>state:</p>
          <p>{auth.user.state}</p>
        </div>
        <div className="account-Btn-container">
          <button className="openModalBtn" onClick={() => setModalOpen(true)}>
            edit
          </button>
          {modalOpen && (
            <AccountModal state={auth.user.state} openModal={setModalOpen} />
          )}
        </div>
      </section>
    </div>
  );
};

export default AccountUpdates;
