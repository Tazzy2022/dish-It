import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteList } from "../features/listSlice";

const ListCard = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const removeList = async (listId) => {
    try {
      await dispatch(deleteList({
        listId: listId,
        token: auth.token}
        ));
    } catch (error) {
      console.log(error);
    }
  };

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
        <button onClick={() => removeList(props.list.id)}></button>
        <p>delete list</p>
      </span>
    </div>
  );
};

export default ListCard;