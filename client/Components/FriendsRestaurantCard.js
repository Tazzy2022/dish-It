import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllLists } from "../features/listSlice";
import AddToListModal from "./AddToListModal";
import CategoriesCard from "./CategoriesCard";

const FriendsRestaurantCard = (props) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const auth = useSelector((state) => state.auth);

  const note = props.notes.find(
    (note) => note.restaurantId === props.restaurant.id
  );

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
    <div className="restaurant-list-container">
      <main className="list-content">
        <section className="list-content1">
          <img
            className="listcard-img"
            src={props.restaurant.image_url}
            alt="restaurant image"
          />
        </section>
        <section className="list-content2">
          <p>{props.restaurant.name}</p>
          <p>{props.restaurant.address1}</p>
          <p>
            {props.restaurant.location.city}, {props.restaurant.location.state},{" "}
            {props.restaurant.location.zip_code}
          </p>
          <p>phone: {props.restaurant.display_phone}</p>
          <Link className="yelp-link" to={props.restaurant.url}>
            yelp link
          </Link>
        </section>
        <section className="list-content3">
          <CategoriesCard category={props.restaurant.categories} />
          <p>price: {props.restaurant.price}</p>

          <button id="add-to-list" onClick={() => handleModalClick()}>
            add to my list
          </button>
          {modalOpen && (
            <AddToListModal
              openModal={setModalOpen}
              restaurantId={props.restaurant.id}
              notes={props.notes}
            />
          )}
        </section>
      </main>
      <section className="list-card-notes">
        <p>Notes:</p>
        {note?.personalNotes?.length > 0 ? (
          <p>{note.personalNotes}</p>
        ) : (
          <p></p>
        )}
      </section>
    </div>
  );
};

export default FriendsRestaurantCard;
