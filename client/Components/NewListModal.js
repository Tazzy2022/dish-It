import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createList } from "../features/singleListSlice";

const NewListModal = ({ openModal }) => {
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setListName((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createNewList = async (e) => {
    e.preventDefault();
    openModal(false);
    const list = await dispatch(
      createList({
        id: auth.user.id,
        token: auth.token,
        listName: listName,
      })
    );
    // if (list.payload) navigate(`/userlists/${list.payload.id}`);
  };

  return (
    <div className="modalBackground">
      <main className="create-list-modal">
        <div className="close-modal">
          <button className="modalbutt" onClick={() => openModal(false)}>
            X
          </button>
        </div>
        <form className="create-list-form" onSubmit={createNewList}>
          <label>new list name:</label>
          <input
            id="line-input"
            type="text"
            name="listName"
            value={listName.listname}
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

export default NewListModal;
