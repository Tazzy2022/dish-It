import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllLists } from "../features/listSlice";
import StarRating from "./StarRating";
import AddToListModal from "./AddToListModal";

const AllRestaurants = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClick = async () => {
    try {
      await dispatch(
        getAllLists({
          id: auth.user.id,
          token: auth.token,
        })
      );
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

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
        </div>
        <div id="rest-card-cat">
          <span id="restaurantCard-rating-link">
            <StarRating rating={props.restaurant.rating} />(
            {props.restaurant.review_count}
            reviews)
            <Link className="yelp-link" to={props.restaurant.url}>
              yelp link
            </Link>
            <div></div>
          </span>
          {props.restaurant.categories.map((cat, index) => {
            return <span key={index}>{cat.title},</span>;
          })}
          <p>price: {props.restaurant.price}</p>
          <p className="add-to-list-click" onClick={() => handleModalClick()}>
            + add to list
          </p>
          {modalOpen && (
            <AddToListModal
              openModal={setModalOpen}
              restaurantId={props.restaurant.id}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default AllRestaurants;
