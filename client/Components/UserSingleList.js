import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getSingleList } from "../features/singleListSlice";
import RestaurantCard from "./RestaurantCard";

const UserSingleList = () => {
  const list = useSelector((state) => state.list);
  const lists = useSelector((state) => state.lists);
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

  let listname;

  if (lists.length > 0) {
    lists.filter((list) => {
      if (list.id === id) {
        listname = list.listName;
      }
    });
  }

  console.log("list.list", list.list);
  console.log("lists", lists);

  return (
    <div className="single-list-container">
      <h1 className="list-h1">{listname || list.listName}</h1>
      {list?.list === "empty" ? (
        <div className="empty-list">
          <p>this list is empty...</p>
          <Link className="search-link" to="/usersearch">
            you can start your search here
          </Link>
        </div>
      ) : list?.list?.length > 0 ? (
        list?.list?.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              auth={auth}
              notes={list.notes}
            />
          );
        })
      ) : (
        <div className="loading-p">Loading...</div>
      )}
    </div>
  );
};

export default UserSingleList;
