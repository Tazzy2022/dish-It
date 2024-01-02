import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotesModal from "./NotesModal";
import {
  removeRestaurantFromList,
  getSingleList,
} from "../features/singleListSlice";
import CategoriesCard from "./CategoriesCard";

const RestaurantCard = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);
  const auth = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteFromList = async (restId) => {
    try {
      await dispatch(
        removeRestaurantFromList({
          listId: list.id,
          token: auth.token,
          restaurantId: restId,
        })
      );
      setIsLoading(true);
      await dispatch(
        getSingleList({
          id: list.id,
          token: auth.token,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const note = props.notes.find(
    (note) => note.restaurantId === props.restaurant.id
  );

  if (isLoading) {
    return <div className="loading-p">Loading...</div>;
  }

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
          <p>{props.restaurant.display_phone}</p>
          <Link className="yelp-link" to={props.restaurant.url}>
            yelp link
          </Link>
        </section>
        <section className="list-content3">
          <CategoriesCard category={props.restaurant.categories} />
          <p>price: {props.restaurant.price}</p>
          <p>
            <button className="updte-button" onClick={() => setModalOpen(true)}>add notes</button>
          </p>
          {modalOpen && (
            <NotesModal
              openModal={setModalOpen}
              notes={note?.personalNotes || ""}
              restaurantId={props.restaurant.id}
            />
          )}
          <p>
            <button className="updte-button" onClick={() => deleteFromList(props.restaurant.id)}>
              delete restaurant
            </button>
            <label></label>
          </p>
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

export default RestaurantCard;
