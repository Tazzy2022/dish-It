import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFriendRequest} from "../features/FriendsSlice"

const FriendModal = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

	const sendInvite = async() => {
		props.openPopUp(false)
		await dispatch(sendFriendRequest())
	}

  return (
    <div>
      <div className="modalBackground">
        <main className="new-list-modal">
          <div id="close-modal">
            <button className="modalX" onClick={() => props.openPopUp(false)}>
              X
            </button>
          </div>
          <section className="modal-content">
						<p>Do you want to add {props.friend.email}</p>
						 <img
              className="profile-img"
              src={props.friend.imageUrl}
              alt="friend's image"
            />
            <p>{props.friend.username}</p>
            <p>
              {props.friend.city}, {props.friend.state}
            </p>
          </section>
          <div>
            <button className="modalbtn" onClick={() => sendInvite()}></button>
            <label>send friend request</label>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FriendModal;
