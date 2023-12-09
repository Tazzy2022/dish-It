import React, { useState } from "react";
import { Link } from "react-router-dom";
import CopyFriendListModal from "./CopyFriendListModal";

const FriendListCard = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="list-card-container">
      <main>
      <Link to={`/friendlists/${props.list.id}`}>
        <img
          className="card-img"
          src={props.list.image}
          alt="list background image"
        />
        <p>{props.list.listName}</p>
      </Link>
      </main>
      <div className="copy-list">
        <button className="copy-list-btn" onClick={() => setModalOpen(true)}>+</button>
        <label>add to my lists</label>
      </div>
      {modalOpen && (
        <CopyFriendListModal list={props.list} openModal={setModalOpen} />
      )}
    </section>
  );
};

export default FriendListCard;
