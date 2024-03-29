import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllLists } from "../features/listSlice";
import ListCard from "./ListCard";
import NewListModal from "./NewListModal";
import { getPhoto } from "../features/imageSlice";

const UserHome = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const image = useSelector((state) => state.image);

  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  let newList;

  useEffect(() => {
    dispatch(
      getPhoto({
        token: auth.token,
        email: auth.user.email,
      })
    );
  }, []);

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
    return <div className="loading-p">Loading...</div>;
  }

  if (lists.length > 0) {
    newList = [...lists];
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
    <div className="userhome-contr">
      <section className="home-header-container">
        {!image?.image?.data ? (
          <img
            className="profile-img"
            src="/avatar-placeholder.jpeg"
            alt="friend's image"
          />
        ) : (
          <img
            className="profile-img"
            src={`data:image/jpeg;base64,${image.image.data}`}
            alt="profile image"
          />
        )}
        <h1 className="profile-name">{auth.user.username}'s lists...</h1>
        <button className="home-button" onClick={() => setModalOpen(true)}>
          + new list
        </button>
        {modalOpen && <NewListModal openModal={setModalOpen} />}
      </section>
      <main className="user-home-list">
        {newList?.length === undefined ? (
          <div>
            <p>no saved lists yet...</p>
            <Link className="search-link" to="/usersearch">
              start your search here
            </Link>
          </div>
        ) : (
          newList?.length > 0 &&
          newList?.map((list) => {
            return <ListCard key={list.id} list={list} auth={auth} />;
          })
        )}
      </main>
    </div>
  );
};

export default UserHome;
