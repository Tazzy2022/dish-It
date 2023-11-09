import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findFriend, getSingleFriendsLists } from "../features/FriendsSlice";
import FriendListCard from "./FriendListCard";

const FriendHome = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const friendEmail = useParams();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(
      findFriend({
        token: auth.token,
        email: friendEmail.email,
      })
    );
    const getList = async () => {
      try {
        setIsLoading(true);
        await dispatch(
          getSingleFriendsLists({
            token: auth.token,
            friendEmail: friendEmail.email,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getList();
  }, []);

  const friends = useSelector((state) => state.friends);

  if (isLoading) {
    return <div className="loading-p">Loading...</div>;
  }

  return (
    <div>
      {friends.friends.length > 0 && (
        <section className="home-header-container">
          <img
            className="profile-img"
            src={friends.friends[0].image}
            alt="profile pic"
          />
          <p className="profile-name">
            {friends.friends[0].username}'s lists...
          </p>
        </section>
      )}
      {friends.friendsLists?.length === 0 ? (
        <div>
          <p>no saved lists yet...</p>
        </div>
      ) : (
        friends.friendsLists?.length > 0 &&
        friends.friendsLists?.map((list) => {
          return <FriendListCard key={list.id} list={list} />;
        })
      )}
    </div>
  );
};

export default FriendHome;
