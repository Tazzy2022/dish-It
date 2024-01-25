import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findFriend, getSingleFriendsLists } from "../features/FriendsSlice";
import FriendListCard from "./FriendListCard";

const FriendHome = () => {
  const dispatch = useDispatch();
  const friendEmail = useParams();
  const auth = useSelector((state) => state.auth);
  let newList;

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

  if (friends.friendsLists.length > 0) {
    newList = [...friends.friendsLists];
    newList.sort((a, b) => {
      const x = a.listName.toLowerCase();
      const y = b.listName.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div>
      {friends?.friend && (
        <section className="home-header-container">
          {!friends?.friend?.image ? (
            <img
              className="profile-img"
              src="/avatar-placeholder.jpeg"
              alt="profile image"
            />
          ) : (
            <img
              className="profile-img"
              src={`data:image/jpeg;base64,${friends?.friend?.image}`}
              alt="profile image"
            />
          )}
          <h1 className="profile-name">{friends.friend.username}'s lists...</h1>
        </section>
      )}
      <main className="user-home-list">
        {newList?.length === undefined ? (
          <div>
            <p>no saved lists yet...</p>
          </div>
        ) : (
          newList?.length > 0 &&
          newList?.map((list) => {
            return <FriendListCard key={list.id} list={list} />;
          })
        )}
      </main>
    </div>
  );
};

export default FriendHome;
