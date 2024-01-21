import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteFriend,
  acceptFriendRequest,
  getPendingFriends,
} from "../features/FriendsSlice";

const PendingCard = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const deletePendingFriend = async () => {
    await dispatch(
      deleteFriend({
        id: auth.user.id,
        token: auth.token,
        friendEmail: props.friend.email,
      })
    );
    await dispatch(
      getPendingFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
  };

  const acceptFriendReq = async () => {
    await dispatch(
      acceptFriendRequest({
        id: auth.user.id,
        token: auth.token,
        friendEmail: props.friend.email,
      })
    );
    await dispatch(
      getPendingFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
  };

  return (
    <div className="pending-friend-contnr">
      <section>
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
      </section>
      <div className="pending-info">
        <Link
          className="pending-details"
          to={`/friendHome/${props.friend.email}`}
        >
          <p>{props.friend.username}</p>
          <p>
            {props.friend.city}, {props.friend.state}
          </p>
        </Link>
        <section className="pending-btns">
          <button onClick={acceptFriendReq}>accept</button>
          <button onClick={deletePendingFriend}>delete</button>
        </section>
      </div>
    </div>
  );
};

export default PendingCard;
