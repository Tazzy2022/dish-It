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
      <section className="pending-card">
        {/* {props.friend.image?.image?.data && (
          <img
            className="profile-img"
            src={`data:image/jpeg;base64,${image.image.data}`}
            alt="profile image"
          />
        )} */}

        {/* {props.friend.image === null ? (
          <img
            className="friend-img"
            src="/avatar-placeholder.jpeg"
            alt="friend's image"
          />
        ) : (
          <img
          className="friend-img"
          src={`data:image/jpeg;base64,${Buffer.from(
            props.friend.image.data
          ).toString("base64")}`}
          alt="friend's image"
        />
          )} */}
        <Link
          className="pending-details"
          to={`/friendHome/${props.friend.email}`}
        >
          <p>{props.friend.username}</p>
          <p>
            {props.friend.city}, {props.friend.state}
          </p>
        </Link>
      </section>
      <section className="pending-btns">
        <div>
          <button onClick={acceptFriendReq}>+</button>
          <label>accept</label>
        </div>
        <div>
          <button onClick={deletePendingFriend}>x</button>
          <label>delete</label>
        </div>
      </section>
    </div>
  );
};

export default PendingCard;
