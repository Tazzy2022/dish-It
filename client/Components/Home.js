import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <article className="intro">
        <p>
          Researching restaurants for a trip? Like keeping track of restaurants
          to try?
          <br />
          Don't have the energy to search for a restaurant? Check out a friend's
          restaurant list.
          <br />
          The options are endless on Dish-it.
          <br />
        </p>
      </article>
      <div id="sign-up">
        <p id="login-signup-link">
          Login or Sign up<Link to="/login"> here</Link>
        </p>
      </div>
      <main id="home-main-container">
        <section className="home-header-container">
          <img
            className="profile-img"
            src="/profile-pic.jpeg"
            alt="profile pic"
          />
          <p className="profile-name">Michele's Lists...</p>
          <p className="profile-add-list">+ new list</p>
        </section>
        {/* <section className="home-filter-container">
          <label>filter by:</label>
          <input type="checkbox" className="filter-personal-checkbox" />
          <label>personal</label>
          <input type="checkbox" className="filter-following-checkbox" />
          <label>following</label>
        </section> */}
        <section className="home-lists">
          <div className="list-card">
            <img
              className="card-img"
              src="/brunch.jpeg"
              alt="list background image"
            />
            <p>Brooklyn brunch</p>
          </div>
          <div className="list-card">
            <img
              className="card-img"
              src="/tacos.png"
              alt="list background image"
            />
            <p>Los Angeles taquerias</p>
          </div>
          <div className="list-card">
            <img
              className="card-img"
              src="/date.png"
              alt="list background image"
            />
            <p>Los Angeles date night spots</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
