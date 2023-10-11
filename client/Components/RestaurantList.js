import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getSavedRestaurants } from "../features/savedRestaurantsSlice";

const RestaurantList = () => {
  const lists = useSelector((state) => state.lists);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSavedRestaurants({
        id: lists.id,
        token: auth.token,
      })
    );
  });

  return (
    <div className="single-list-container">
      {/* <p>{listName}</p>
      <section className="list-card">
        <img
          className="card-img"
          src={props.list.imageUrl}
          alt="restaurant image"
        />
        <p>{name}</p>
        <p>{address1}</p>
        <p>
          {city}, {state}, {zip_code}
        </p>
        <p>{display_phone}</p>
        <Link className="yelp-link" to={`/${id}`}>
          yelp link
        </Link>
        {/* probably need to loop through the below */}
      {/* <p>{category}</p> */}
      {/* <p>+ add notes</p>
        <p>x delete from list</p>
				<p>Notes:</p>
				{notes && }
      </section> */}
      <span>
        <button></button>
        <p>delete list</p>
      </span>
    </div>
  );
};

export default RestaurantList;
