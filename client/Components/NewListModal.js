import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createList } from "../features/singleListSlice";

const NewListModal = ({ openModal }) => {
  const [newList, setNewList] = useState({ listName: "" });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setNewList((prevState) => ({
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
        listName: newList.listName,
      })
    );
    // if (list.payload) navigate(`/userlists/${list.payload.id}`);
  };

  return (
    <div className="modalBackground">
      <main className="new-list-modal">
        <form className="create-list-form" onSubmit={createNewList}>
          <label>List name:</label>
          <input
            id="line-input"
            type="text"
            name="listName"
            value={newList.listName}
            onChange={handleChange}
          />
          <div>
            <button className="modalbtn" type="submit">
              create
            </button>
            <button className="modalbtn" onClick={() => openModal(false)}>
              cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewListModal;
