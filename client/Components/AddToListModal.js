import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRestoToList } from "../features/singleListSlice";

const AddToListModal = ({ openModal, restaurantId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const lists = useSelector((state) => state.lists);

  const [listName, setListName] = useState("");

  console.log("restaurantId in component", restaurantId);
  const newAdd = async (restId, listName) => {
    try {
      openModal(false);
      await dispatch(
        addRestoToList({
          userId: auth.user.id,
          token: auth.token,
          listName: listName,
          restaurantId: restId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setListName((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createNewList = async (e) => {
    e.preventDefault();
    openModal(false);
    await dispatch(
      addRestoToList({
        userId: auth.user.id,
        token: auth.token,
        listName: listName.listName,
        restaurantId: restaurantId,
      })
    );
  };

  return (
    <div className="modalBackground">
      <main className="addTo-list-modal">
        <div id="close-modal">
          <button className="modalX" onClick={() => openModal(false)}>
            X
          </button>
        </div>
        <form className="addTo-list-form" onSubmit={createNewList}>
          <label>new list name:</label>
          <section id="addToList-section">
            <input
              id="line-input"
              type="text"
              name="listName"
              value={listName.listname}
              onChange={handleChange}
            />
            <button className="modalbtn" type="submit">
              create
            </button>
          </section>
        </form>
        <section id="all-lists-container">
          {lists?.length > 0 && <p>or add to existing list:</p>}
          {lists?.length > 0 &&
            lists?.map((list) => {
              return (
                <div key={list.id}>
                  <section className="modal-lists">
                    <p>{list.listName}</p>
                    <button
                      onClick={() => newAdd(restaurantId, list.listName)}
                      className="modalbtn"
                    >
                      +
                    </button>
                  </section>
                </div>
              );
            })}
        </section>
      </main>
    </div>
  );
};

export default AddToListModal;
