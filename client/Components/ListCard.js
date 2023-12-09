import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteList, getAllLists } from "../features/listSlice";

const ListCard = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const removeList = async (listId) => {
    try {
      await dispatch(
        deleteList({
          listId: listId,
          token: auth.token,
        })
      );
      await dispatch(
        getAllLists({
          id: auth.user.id,
          token: auth.token,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="list-card-container">
      <main>
        <Link to={`/userlists/${props.list.id}`}>
          <img
            className="card-img"
            src={props.list.image}
            alt="list background image"
          />
          <p>{props.list.listName}</p>
        </Link>
      </main>
      <div className="list-card-btn">
        <button onClick={() => removeList(props.list.id)}>X</button>
        <label>delete list</label>
      </div>
    </section>
  );
};

export default ListCard;
