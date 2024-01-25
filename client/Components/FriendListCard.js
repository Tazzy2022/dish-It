import React, { useState } from "react";
import { Link } from "react-router-dom";

const FriendListCard = (props) => {

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
    </section>
  );
};

export default FriendListCard;
