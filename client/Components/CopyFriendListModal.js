import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { copyList } from "../features/singleListSlice";

const CopyFriendListModal = (props) => {
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setListName(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  const copyThisList = async (e) => {
    e.preventDefault();
    props.openModal(false);
    console.log("listName", listName);
    const list = await dispatch(
      copyList({
        id: auth.user.id,
        token: auth.token,
        listName: listName,
        restaurantIdArray: props.list.restaurantIdArray,
        //listId: props.list.id
      })
    );
    if (list.payload) navigate(`/userlists/${list.payload.id}`);
  };

  return (
    <div className="modalBackground">
      <main className="new-list-modal">
        <form className="create-list-form" onSubmit={copyThisList}>
          <label>new list name:</label>
          <input
            id="line-input"
            type="text"
            name="listName"
            placeholder={props.list.listName}
            value={listName.value}
            onChange={handleChange}
          />
          <div>
            <button className="modalbtn" type="submit">
              create
            </button>
            <button className="modalbtn" onClick={() => props.openModal(false)}>
              cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CopyFriendListModal;
