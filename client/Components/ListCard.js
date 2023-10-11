import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSavedRestaurants } from "../features/savedRestaurantsSlice";

const ListCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleclick = (listId) => {
    dispatch(
      getSavedRestaurants({
        id: listId,
        token: props.auth.token,
      })
    );
  };

  return (
    <div className="home-lists-container">
      <Link
        onClick={handleclick(props.list.id)}
        to={`/userlists/${props.list.id}`}
        className="list-card"
      >
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
