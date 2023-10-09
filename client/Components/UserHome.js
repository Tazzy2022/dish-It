import React, { useState } from "react";
import { getUser } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UserHome = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUser({
        id: auth.user.id,
        token: auth.token,
      })
    );
  });

  return (
    <div>
      <section className="home-header-container">
        <img
          className="profile-img"
          src="/profile-pic.jpeg"
          alt="profile pic"
        />
        <p className="profile-name">{authSlice.username} Lists...</p>
        <p className="profile-add-list">+ new list</p>
      </section>
      <section className="home-filter-container">
        <label>filter by:</label>
        <input type="checkbox" className="filter-personal-checkbox" />
        <label>personal</label>
        <input type="checkbox" className="filter-following-checkbox" />
        <label>following</label>
      </section>
      <section className="home-lists-container">
        <div className="list-card">
          <img
            className="card-img"
            src="/brunch.jpeg"
            alt="list background image"
          />
          <p>list name placholder</p>
        </div>
      </section>
    </div>
  );
};

export default UserHome;
