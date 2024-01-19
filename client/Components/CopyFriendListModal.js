import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { copyList } from "../features/singleListSlice";

const CopyFriendListModal = (props) => {
  console.log("PROPS", props);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setListName(e.target.value);
  };

  const copyThisList = async (e) => {
    e.preventDefault();
    props.openModal(false);
    const list = await dispatch(
      copyList({
        id: auth.user.id,
        token: auth.token,
        listName: listName || props.list.listName,
        restaurantIdArray: props.list.restaurantIdArray,
        image: props.list.image,
      })
    );

    if (list.payload.id) navigate(`/userlists/${list.payload.id}`);
  };

  return (
    <div className="modalBackground">
      <main className="create-list-modal">
        <div className="close-modal">
          <button className="modalbtn" onClick={() => props.openModal(false)}>
            X
          </button>
        </div>
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
            <button className="modalbutton" type="submit">
              create
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CopyFriendListModal;
