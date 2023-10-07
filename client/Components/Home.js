import React, { useState } from "react";

const Home = () => {
  return (
    <div>
      <article>
        <p>Researching restaurants for a trip?</p>
        <p>Like keeping track of restaurants to try?</p>
        <p>
          Don't have the energy to search for a restaurant? Check out a friend's
          restaurant list.
        </p>
        <p>The options are endless on Dish iT.</p>
      </article>
      <main id="home-main-container">
        <section className="home-header-container">
          <img
            className="profile-img"
            src="../../public/profile-pic.jpg"
            alt="profile pic"
          />
          <p>Michele's Lists...</p>
          <p>+ new list</p>
        </section>
        <section className="home-links-container">
          <p>filter by:</p>
          <input type="checkbox" className="filter-personal-checkbox" />
          <label>personal</label>
          <input type="checkbox" className="filter-following-checkbox" />
          <label>following</label>
        </section>
        <section className="home-lists-container">
          <div className="list-card">
            <img
              className="list-bkgrnd-img"
              src="../../public/brunch.png"
              alt="list background image"
            />
            <p>Brooklyn brunch</p>
            <p>from owlram2002</p>
          </div>
          <div className="list-card">
            <img
              className="list-bkgrnd-img"
              src="../../public/tacos.png"
              alt="list background image"
            />
            <p>Los Angeles taquerias</p>
          </div>
          <div className="list-card">
            <img
              className="list-bkgrnd-img"
              src="../../public/date.png"
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
