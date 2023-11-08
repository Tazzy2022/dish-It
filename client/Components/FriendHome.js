import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { inviteFriends } from "../features/FriendsSlice";
import { getSingleFriendLists } from "../features/singleFriendSlice";
import ListCard from "./ListCard";

const FriendHome = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const friendEmail = useParams();

  const [isLoading, setIsLoading] = useState(false);

  console.log("friendEmail", friendEmail);

  useEffect(() => {
    dispatch(
      inviteFriends({
        token: auth.token,
        email: friendEmail,
      })
    );
    const getList = async () => {
      try {
        setIsLoading(true);
        await dispatch(
          getSingleFriendLists({
            token: auth.token,
            friendEmail: friendEmail,
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

  const friendLists = useSelector((state) => state.singleFriend);

  if (isLoading) {
    return <div className="loading-p">Loading...</div>;
  }

  return <div></div>;
};

export default FriendHome;
