import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { renderAllRestaurants } from "../features/allRestaurantsSlice";
import { renderSingleRestaurant } from "../features/singleRestaurantSlice";

const SingleRestaurant = (props) => {
  
  return (
    <main className="restaurant-list-container">
      <section className="list-card">
        <img
          className="card-img"
          src={props.restaurant.image_url}
          alt="restaurant image"
        />
        <p>{props.restaurant.name}</p>
        <p>{props.restaurant.address1}</p>
        <p>
          {props.restaurant.location.city}, {props.restaurant.location.state},{" "}
          {props.restaurant.location.zip_code}
        </p>
        <p>phone: {props.restaurant.display_phone}</p>
        <p>price: {props.restaurant.price}</p>
        <Link className="yelp-link" to={props.restaurant.url}>
          yelp link
        </Link>
        <p>food category:</p>
        {props.restaurant.categories.map((cat, index) => {
          return <p>{cat[index]}</p>;
        })}
        <p>+ add to list</p>
      </section>
      ;
    </main>
  );
};

export default SingleRestaurant;
