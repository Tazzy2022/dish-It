import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findFriend, getSingleFriendsLists } from "../features/FriendsSlice";
import ListCard from "./ListCard";

const FriendHome = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const friendEmail = useParams();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
		console.log("friendEmail.email in find friend dispatch", friendEmail.email)
    // dispatch(
    //   findFriend({
    //     token: auth.token,
    //     email: friendEmail.email,
    //   })
    // );
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

  console.log("friends.friendsLists", friends.friendsLists);

  return (
    <div>
      <section className="home-header-container">
        <img
          className="profile-img"
          src={friends.friend.image}
          alt="profile pic"
        />
        <p className="profile-name">{friends.friend.name}'s lists...</p>
      </section>
      {friends.friendsLists?.length === 0 ? (
        <div>
          <p>no saved lists yet...</p>
        </div>
      ) : (
        friends.friendsLists?.length > 0 && <p>friends lists get mapped here</p>
        // friendLists?.map((list) => {
        //   return <ListCard key={list.id} list={list} auth={auth} />;
        // })
      )}
    </div>
  );
};

export default FriendHome;
