import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = (props) => {
  return (
    <div className="restaurant-list-container">
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
        {props.restaurant.categories.map((cat) => {
          return cat;
        })}
        {/* probably need to loop through the below */}
        {/* <p>{props.restaurant.category}</p> */}
        <p>+ add notes</p>
        <p>x delete from list</p>
        <p>Notes:</p>
        {props.notes[index] && <p>{props.notes[index].personalNotes}</p>}
      </section>
    </div>
  );
};

export default RestaurantCard;
