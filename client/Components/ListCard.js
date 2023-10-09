import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ListCard = (props) => {
  return (
    <div className="home-lists-container">
      <Link className="list-card">
        <img
          className="card-img"
          src={props.list.imageUrl}
          alt="list background image"
        />
        <p>{props.listName}</p>
      </Link>
    </div>
  );
};

export default ListCard;
