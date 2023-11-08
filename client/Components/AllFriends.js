import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, getPendingFriends } from "../features/FriendsSlice";

const AllFriends = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const deleteFriend = async () => {
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
    <div>
      <button onClick={deleteFriend}>X</button>
      <Link to={`/friendHome/${props.friend.email}`}>
      <img
        className="profile-img"
        src={props.friend.imageData}
        alt="friend's image"
      />
      <p>{props.friend.username}</p>
      <p>
        {props.friend.city}, {props.friend.state}
      </p>
     </Link>
    </div>
  );
};

export default AllFriends;
