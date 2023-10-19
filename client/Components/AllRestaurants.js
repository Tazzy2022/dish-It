import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

const AllRestaurants = (props) => {
  return (
    <main className="restaurant-list-card">
      <section>
        <img
          className="restaurant-card-img"
          src={props.restaurant.image_url}
          alt="restaurant image"
        />
      </section>
      <section className="restaurant-card-info">
        <div id="rest-card-info">
          <p>{props.restaurant.name}</p>
          <p>{props.restaurant.location.address1}</p>
          <p>
            {props.restaurant.location.city}, {props.restaurant.location.state},{" "}
            {props.restaurant.location.zip_code}
          </p>
          <p>phone: {props.restaurant.display_phone}</p>
          <p>price: {props.restaurant.price}</p>
          <Link className="yelp-link" to={props.restaurant.url}>
            yelp link
          </Link>
        </div>
        <div id="rest-card-cat">
          <p>food category:</p>
          {props.restaurant.categories.map((cat, index) => {
            return <p key={index}>{cat.title},</p>;
          })}
          <p>
            <StarRating rating={props.restaurant.rating} />(
            {props.restaurant.review_count}
            reviews)
          </p>
          <p>+ add to list</p>
        </div>
      </section>
    </main>
  );
};

export default AllRestaurants;
