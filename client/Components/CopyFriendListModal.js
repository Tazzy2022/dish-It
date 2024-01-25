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
  };

  let restArr = [];
  props.list.forEach((resto) => {
    restArr.push(resto.id);
  });

  const copyThisList = async (e) => {
    e.preventDefault();
    props.openModal(false);
    const copiedList = await dispatch(
      copyList({
        id: auth.user.id,
        token: auth.token,
        listName: listName,
        restaurantIdArray: restArr,
        image: props.list.image,
        restaurantNotes: props.notes || "",
      })
    );

    if (copiedList.payload.id) navigate(`/userlists/${copiedList.payload.id}`);
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
