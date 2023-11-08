import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFriendRequest } from "../features/FriendsSlice";
import ContentModal from "./ContentModal";

const FriendModal = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const friends = useSelector((state) => state.friends);

  const [contentModal, setContentModal] = useState(false);
  const [content, setContent] = useState("");

  const sendInvite = async () => {
    props.openPopUp(false);
    await dispatch(
      sendFriendRequest({
        token: auth.token,
        id: auth.user.id,
        userEmail: friends.friendInvited.email,
        //userEmail: props.friend.email,
      })
    );
    setContentModal(true);
    setContent("Your request has been sent!");
  };

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
              src={props.friend.imageData}
              alt="friend's image"
            />
            <p>{props.friend.username}</p>
            <p>
              {props.friend.city}, {props.friend.state}
            </p>
          </section>
          <div>
            <button className="modalbtn" onClick={() => sendInvite()}>+</button>
            <label>send friend request</label>
          </div>
        </main>
        {contentModal && (
          <ContentModal openContentModal={setContentModal} content={content} />
        )}
      </div>
    </div>
  );
};

export default FriendModal;
