import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, getPendingFriends } from "../features/FriendsSlice";

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
      getPendingFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
  };
  return (
    <div className="friend-card">
      <button onClick={deleteAFriend}>delete</button>
      <img
        className="friend-img"
        // src={props.friend.image}
        alt="friend's image"
      />
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
