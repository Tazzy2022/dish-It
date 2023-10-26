import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotesModal from "./NotesModal";

const RestaurantCard = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const deleteFromList = async (restId) => {};

  const note = props.notes.find(
    (note) => note.restaurantId === props.restaurant.id
  );

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
        <button onClick={() => deleteFromList(restId)}>x</button>
        <label>remove from list</label>
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
