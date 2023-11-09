import React, { useState } from "react";
import { Link } from "react-router-dom";
import CopyFriendListModal from "./CopyFriendListModal";

const FriendListCard = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="home-lists-container">
      <Link to={`/friendlists/${props.list.id}`} className="list-card">
        <img
          className="card-img"
          src={props.list.image}
          alt="list background image"
        />
        <p>{props.list.listName}</p>
      </Link>
      <span>
        <button onClick={() => setModalOpen(true)}></button>
        <label>add to my lists</label>
      </span>
      {modalOpen && (
        <CopyFriendListModal list={props.list} openModal={setModalOpen} />
      )}
    </div>
  );
};

export default FriendListCard;
