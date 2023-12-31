import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, getAllFriends } from "../features/FriendsSlice";

const AllFriends = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const deleteAFriend = async () => {
    await dispatch(
      deleteFriend({
        id: auth.user.id,
        token: auth.token,
        friendEmail: props.friend.email,
      })
    );
    await dispatch(
      getAllFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
  };

  return (
    <div className="friend-card">
      <button onClick={deleteAFriend}>delete</button>
      {props.friend.image === null ? (
        <img
          className="friend-img"
          src="/avatar-placeholder.jpeg"
          alt="friend's image"
        />
      ) : (
        <img
          className="profile-img"
          src={`data:image/jpeg;base64,${props.friend.image}`}
          alt="profile image"
        />
      )}
      <Link className="friend-link" to={`/friendHome/${props.friend.email}`}>
        <p>{props.friend.username}</p>
        <p>
          {props.friend.city}, {props.friend.state}
        </p>
      </Link>
    </div>
  );
};

export default AllFriends;
