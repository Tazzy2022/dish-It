import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFriend, acceptFriendRequest, getPendingFriends } from "../features/FriendsSlice";

const PendingCard = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const deletePendingFriend = async () => {
    await dispatch(
      deleteFriend({
        id: auth.user.id,
        token: auth.token,
        //friendId: friendId,
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
    <div>
      <button onClick={deletePendingFriend}>X</button>
     <Link to={`/friendHome/${props.friend.email}`}>
     <img
        className="profile-img"
        // src={props.friend.imageData}
        alt="friend's image"
      />
      <p>{props.friend.username}</p>
      <p>
        {props.friend.city}, {props.friend.state}
      </p>
      </Link>
      <button onClick={acceptFriendReq}>+</button>
      <label>accept</label>
    </div>
  );
};

export default PendingCard;
