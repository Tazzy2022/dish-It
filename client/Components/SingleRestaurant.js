import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { renderAllRestaurants } from "../features/allRestaurantsSlice";
import { renderSingleRestaurant } from "../features/singleRestaurantSlice";

const SingleRestaurant = () => {
  const restaurants = useSelector(renderAllRestaurants);
  const restaurant = useSelector(renderSingleRestaurant);

  return (
    <main className="restaurant-list-container">
      <section className="list-card">
        <img
          className="card-img"
          src={restaurant.image_url}
          alt="restaurant image"
        />
        <p>{restaurant.name}</p>
        <p>{restaurant.address1}</p>
        <p>
          {restaurant.location.city}, {restaurant.location.state},{" "}
          {restaurant.location.zip_code}
        </p>
        <p>phone: {restaurant.display_phone}</p>
        <p>price: {restaurant.price}</p>
        <Link className="yelp-link" to={restaurant.url}>
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
