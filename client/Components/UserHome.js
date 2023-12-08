import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllLists } from "../features/listSlice";
import { Buffer } from "buffer";
import ListCard from "./ListCard";
import NewListModal from "./NewListModal";

const UserHome = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    <div>
      <section className="home-header-container">
        {/* <img className="profile-img" src={auth.user.image} alt="profile pic" /> */}
        {auth.user.image === null ? (
          <img
            className="profile-img"
            src="/avatar-placeholder.jpeg"
            alt="profile image"
          />
        ) : (
          <img
            className="profile-img"
            src={`data:image/jpeg;base64,${Buffer.from(
              auth.user.image.data
            ).toString("base64")}`}
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
            <Link to="/usersearch">start your search here</Link>
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
