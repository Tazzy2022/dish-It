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
    console.log("HIIIIII");
    try {
      console.log("notes in update", notes);
      const newNote = await dispatch(
        updateNotes({
          listId: list.id,
          token: auth.token,
          restaurantId: props.restaurantId,
          personalNotes: notes,
        })
      );
      console.log("newNote", newNote);
      if (newNote.payload) {
        console.log("IT IS A NEWNOTE", newNote);
        const updatedList = await dispatch(
          getSingleList({
            id: list.id,
            token: auth.token,
          })
        );
        console.log("updatedList", updatedList);
      }
      props.openModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    console.log("event.target.value", event.target.value);
    console.log("notes before", notes);
    // setNotes(event.target.value);
    setNotes(event.target.value);
    console.log("notes after", notes);
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
            // onChange={(e) => setNotes(e.target.value)}
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
