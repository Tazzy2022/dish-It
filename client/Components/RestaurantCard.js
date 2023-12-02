import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotesModal from "./NotesModal";
import {
  removeRestaurantFromList,
  getSingleList,
  renderSingleList,
} from "../features/singleListSlice";

const RestaurantCard = (props) => {
  const dispatch = useDispatch();
  const list = useSelector(renderSingleList);
  const auth = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteFromList = async (restId) => {
    try {
      setIsLoading(true);
      await dispatch(
        removeRestaurantFromList({
          listId: list.id,
          token: auth.token,
          restaurantId: restId,
        })
      );
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
      <main className="list-card">
        <section className="list-card1">
          <img
            className="card-img"
            src={props.restaurant.image_url}
            alt="restaurant image"
          />
        </section>
        <section className="list-card2">
          <p>{props.restaurant.name}</p>
          <p>{props.restaurant.address1}</p>
          <p>
            {props.restaurant.location.city}, {props.restaurant.location.state},{" "}
            {props.restaurant.location.zip_code}
          </p>
          <p>{props.restaurant.display_phone}</p>
          <p>price: {props.restaurant.price}</p>
        </section>
        <section className="list-card3">
          <Link className="yelp-link" to={props.restaurant.url}>
            yelp link
          </Link>
          <p>Food category:</p>
          {props.restaurant.categories.map((cat, index) => {
            return <p key={index}>{cat.title},</p>;
          })}
          <button onClick={() => setModalOpen(true)}>+</button>
          <label>add notes</label>
          {modalOpen && (
            <NotesModal
              openModal={setModalOpen}
              notes={note?.personalNotes || ""}
              restaurantId={props.restaurant.id}
            />
          )}
          <button onClick={() => deleteFromList(props.restaurant.id)}>x</button>
          <label>remove from list</label>
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
