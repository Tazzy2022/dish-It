import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleList } from "../features/singleListSlice";
import FriendsRestaurantCard from "./FriendsRestaurantCard";
import CopyFriendListModal from "./CopyFriendListModal";

const FriendSingleList = () => {
  const list = useSelector((state) => state.list);
  const auth = useSelector((state) => state.auth);
  const friends = useSelector((state) => state.friends);
  const { id } = useParams();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    <div>
      <h1 className="friend-name">{friends.friend.username}'s list</h1>
      <main className="single-list-container">
        <h2 className="list-h2">{list?.listName}</h2>

        <div className="copy-list">
          <button className="copy-list-btn" onClick={() => setModalOpen(true)}>
            +
          </button>
          <label>save this list to my account</label>
        </div>
        {modalOpen && list?.list?.length > 0 && (
          <CopyFriendListModal
            list={list.list}
            notes={list.notes}
            openModal={setModalOpen}
          />
        )}

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
      </main>
    </div>
  );
};

export default FriendSingleList;
