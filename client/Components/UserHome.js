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
        <p className="profile-name">{auth.user.username}'s lists...</p>
        <button className="home-button" onClick={() => setModalOpen(true)}>
          + new list
        </button>
        {modalOpen && <NewListModal openModal={setModalOpen} />}
      </section>
      <main className="user-home-list">
        {lists?.length === 0 ? (
          <div>
            <p>no saved lists yet...</p>
            <Link className="search-link" to="/usersearch">
              start your search here
            </Link>
          </div>
        ) : (
          lists?.length > 0 &&
          lists?.map((list) => {
            return <ListCard key={list.id} list={list} auth={auth} />;
          })
        )}
      </main>
    </div>
  );
};

export default UserHome;
