import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleList } from "../features/singleListSlice";
import FriendsRestaurantCard from "./FriendsRestaurantCard";

const FriendSingleList = () => {
  const list = useSelector((state) => state.list);
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        setIsLoading(true);
        await dispatch(
          getSingleList({
            id: id,
            token: auth.token,
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

  if (isLoading) {
    return <div className="loading-p">Loading...</div>;
  }

  return (
    <div className="single-list-container">
      <p className="list-h1">{list?.listName}</p>
      {list?.list?.length === 0 || Object.keys(list).length === 0 ? (
        <div className="empty-list">
          <p>this list is empty...</p>
        </div>
      ) : (
        list?.list?.length > 0 &&
        list?.list?.map((restaurant) => {
          return (
            <FriendsRestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              auth={auth}
              notes={list.notes}
            />
          );
        })
      )}
    </div>
  );
};

export default FriendSingleList;
