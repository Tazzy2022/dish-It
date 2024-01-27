import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRestoToList, createListAndAdd } from "../features/singleListSlice";
import { useNavigate, useLocation } from "react-router-dom";
import ContentModal from "./ContentModal";

const AddToListModal = ({ openModal, restaurantId, notes }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const lists = useSelector((state) => state.lists);

  const [listName, setListName] = useState("");
  const [error, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let note = "empty";

  if (notes !== undefined) {
    notes.find((n) => {
      if (n.restaurantId === restaurantId) {
        note = n.personalNotes;
      }
    });
  }

  const newAdd = async (restId, listName) => {
    try {
      const added = await dispatch(
        addRestoToList({
          userId: auth.user.id,
          token: auth.token,
          listName: listName,
          restaurantId: restId,
          notes: note,
        })
      );
      if (added.payload.id === undefined) {
        setErrorMessage("that restaurant is already on that list");
        setErrorModal(true);
      } else if (location.pathname.includes("friendlists")) {
        navigate(-1);
      } else {
        openModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setListName((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    const checkDupe = lists.find((list) => list.listName === e.target.value);
    if (checkDupe) {
      setErrorMessage("oops, that list name already exists");
      setErrorModal(true);
    }
  };

  const createNewList = async (e) => {
    e.preventDefault();
    const added = await dispatch(
      createListAndAdd({
        userId: auth.user.id,
        token: auth.token,
        listName: listName.listName,
        restaurantId: restaurantId,
        notes: note,
      })
    );
    if (location.pathname.includes("friendlists")) {
      navigate(-1);
    } else {
      openModal(false);
    }
  };

  return (
    <div className="modalBackground">
      <main className="addTo-list-modal">
        <div className="close-modal">
          <button className="modalbutt" onClick={() => openModal(false)}>
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
            <button className="modalbutton" type="submit">
              create
            </button>
          </section>
        </form>
        {error && (
          <ContentModal openErrorModal={setErrorModal} content={errorMessage} />
        )}
        <section id="all-lists-container">
          {lists?.length > 0 && <p>OR add to existing list:</p>}
          {lists?.length > 0 &&
            lists?.map((list) => {
              return (
                <div key={list.id}>
                  <section id="modal-lists">
                    <button id="add-bttn" onClick={() => newAdd(restaurantId, list.listName)}>
                      add
                    </button>
                    <p>{list.listName}</p>
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
