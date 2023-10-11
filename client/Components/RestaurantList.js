import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const RestaurantList = () => {
  const lists = useSelector((state) => state.lists);
  const auth = useSelector((state) => state.auth);
  const savedRestaurants = useSelector((state) => state.savedRestaurants);

  console.log("savedRestaurants", savedRestaurants);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     getSavedRestaurants({
  //       id: lists.id,
  //       token: auth.token,
  //     })
  //   );
  // });

  return (
    <div className="single-list-container">
      {savedRestaurants?.results?.length === 0 ? (
        <div>
          <p>this list is empty...</p>
          <Link to="/usersearch">you can start your search here</Link>
        </div>
      ) : (
        savedRestaurants?.results?.length > 0 &&
        savedRestaurants?.results?.map((restaurant, index) => {
          <div>
            <p>{listName}</p>
            <section className="list-card">
              <img
                className="card-img"
                src={restaurant.imageUrl}
                alt="restaurant image"
              />
              <p>{restaurant.name}</p>
              <p>{restaurant.address1}</p>
              <p>
                {restaurant.city}, {restaurant.state}, {restaurant.zip_code}
              </p>
              <p>{restaurant.display_phone}</p>
              <Link className="yelp-link" to={`/restaurant.${id}`}>
                yelp link
              </Link>
              {/* probably need to loop through the below */}
              {/* <p>{restaurant.category}</p> */}
              <p>+ add notes</p>
              <p>x delete from list</p>
              <p>Notes:</p>
              {notes?.index && <p>{notes.index.personalNotes}</p>}
            </section>
          </div>;
        })
      )}
    </div>
  );
};

export default RestaurantList;
