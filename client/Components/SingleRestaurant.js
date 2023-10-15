import React from "react";
import { Link } from "react-router-dom";

const SingleRestaurant = (props) => {
  console.log("@@@@@@", props);
  const categories = { ...props.restaurant.categories };
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
          return <p key={index}>{cat.title}</p>;
        })}
        <p>
          {props.restaurant.rating}&#9733({props.restaurant.review_count}{" "}
          reviews)
        </p>
        <p>+ add to list</p>
      </section>
      ;
    </main>
  );
};

export default SingleRestaurant;
