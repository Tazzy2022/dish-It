import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNotes, getSingleList } from "../features/singleListSlice";

const NotesModal = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const list = useSelector((state) => state.list);
  const [notes, setNotes] = useState(props.notes);

  const addToNotes = async (e) => {
    e.preventDefault();
    try {
      const newNote = await dispatch(
        updateNotes({
          listId: list.id,
          token: auth.token,
          restaurantId: props.restaurantId,
          personalNotes: notes,
        })
      );
      if (newNote.payload) {
        await dispatch(
          getSingleList({
            id: list.id,
            token: auth.token,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <div className="modalBackground">
      <main className="new-note-modal">
        <div className="close-modal">
          <button className="modalX" onClick={() => props.openModal(false)}>
            X
          </button>
        </div>
        <form className="create-list-form" onSubmit={addToNotes}>
          <label>Notes:</label>
          <textarea
            name="note"
            rows="10"
            cols="30"
            type="text"
            value={notes}
            onChange={handleChange}
          ></textarea>
          <br></br>
          <div>
            <button className="modalbtn" type="submit">
              update
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NotesModal;
