import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListCard = (props) => {
  return (
    <div className="home-lists-container">
      <Link to={`/userlists/${props.list.id}`} className="list-card">
        <img
          className="card-img"
          src={props.list.imageUrl}
          alt="list background image"
        />
        <p>{props.list.listName}</p>
      </Link>
      <span>
        <button></button>
        <p>delete list</p>
      </span>
    </div>
  );
};

export default ListCard;
