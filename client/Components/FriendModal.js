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
        userEmail: friends.friend.email,
      })
    );
    setContentModal(true);
    setContent("Your request has been sent!");
  };

  return (
    <div className="modalBackground">
      <main className="addFriend-modal">
        <div className="close-modal">
          <button
            className="modalbutton"
            onClick={() => props.openPopUp(false)}
          >
            X
          </button>
        </div>
        <section className="friendModal-content">
          {props.friend.image !== null ? (
            <img
              className="friend-img"
              src={`data:image/jpeg;base64,${props.friend.image}`}
              alt="friend's image"
            />
          ) : (
            <img
              className="friend-img"
              src="/avatar-placeholder.jpeg"
              alt="friend's image"
            />
          )}
          <div className="friend-modalps">
            <p>{props.friend.username}</p>
            <p>
              {props.friend.city}, {props.friend.state}
            </p>
          </div>
        </section>
        <div>
          <button className="modalbutt" onClick={() => sendInvite()}>
            send friend request
          </button>
        </div>
      </main>
      {contentModal && (
        <ContentModal openContentModal={setContentModal} content={content} />
      )}
    </div>
  );
};

export default FriendModal;
