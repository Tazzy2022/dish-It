import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllLists } from "../features/listSlice";
import ListCard from "./ListCard";

const UserHome = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        setIsLoading(true);
        await dispatch(
          getAllLists({
            id: auth.user.id,
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

  const lists = useSelector((state) => state.lists);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="home-header-container">
        <img
          className="profile-img"
          src={auth.user.imageUrl}
          alt="profile pic"
        />
        <p className="profile-name">{auth.user.username}'s Lists...</p>
        <p className="profile-add-list">+ new list</p>
      </section>
      <section className="home-filter-container">
        <label>filter by:</label>
        <input type="checkbox" className="filter-personal-checkbox" />
        <label>personal</label>
        <input type="checkbox" className="filter-following-checkbox" />
        <label>following</label>
      </section>
      {lists?.length === 0 ? (
        <p>this list is empty</p>
      ) : (
        lists?.length > 0 &&
        //console.log(lists[0], lists.length)
        //<pre>{JSON.stringify(lists, null, 2)}</pre>
        lists?.map((list) => {
          // return (
          //   <div key={list.id} className="home-lists-container">
          //     <Link className="list-card">
          //       <img
          //         className="card-img"
          //         src={list.imageUrl}
          //         alt="list background image"
          //       />
          //       <p>{list.listName}</p>
          //     </Link>
          //   </div>
          // );
          return <ListCard key={list.id} list={list} />;
        })
      )}
    </div>
  );
};

export default UserHome;
