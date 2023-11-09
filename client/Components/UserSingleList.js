import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getSingleList, renderSingleList } from "../features/singleListSlice";
import RestaurantCard from "./RestaurantCard";

const UserSingleList = () => {
  const list = useSelector(renderSingleList);
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

  console.log("LIST", list);

  return (
    <div className="single-list-container">
      <p className="list-name">{listname}</p>
      {list?.list?.length === 0 || Object.keys(list).length === 0 ? (
        <div>
          <p>this list is empty...</p>
          <Link to="/usersearch">you can start your search here</Link>
        </div>
      ) : (
        list?.list?.length > 0 &&
        list?.list?.map((restaurant, index) => {
          return (
            <RestaurantCard
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

export default UserSingleList;
