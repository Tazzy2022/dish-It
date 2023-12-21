import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
//import { Buffer } from "buffer";
import { getPendingFriends } from "../features/FriendsSlice";
import { getUser } from "../features/authSlice";
import PendingCard from "./PendingCard";
import { getPhoto } from "../features/imageSlice";

const AccountHome = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const friends = useSelector((state) => state.friends);
  const image = useSelector((state) => state.image);
  const [file, setFile] = useState("");

  // useEffect(() => {
  //   dispatch(
  //     getPendingFriends({
  //       id: auth.user.id,
  //       token: auth.token,
  //     })
  //   );
  // }, []);

  // useEffect(() => {
  //   dispatch(
  //     getPhoto({
  //       token: auth.token,
  //       id: auth.user.id,
  //     })
  //   );
  // }, []);

  useEffect(() => {
    dispatch(
      getPendingFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
    dispatch(
      getPhoto({
        token: auth.token,
        id: auth.user.id,
      })
    );
  }, [file]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(
        `/api/users/avatar/${auth.user.id}`,
        formData,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      dispatch(
        getUser({
          id: auth.user.id,
          token: auth.token,
        })
      );
    } catch (err) {
      console.error("error uploading image: ", err);
    }
  };

  return (
    <div className="account-home-container">
      <section className="user-account-home">
        <h1 className="user-account-h1">{auth.user.username}</h1>
        {/* {auth.user.image === null ? (
          <img
            className="account-img"
            src="/avatar-placeholder.jpeg"
            alt="profile image"
          />
        ) : (
          <img
            className="account-img"
            src={`data:image/jpeg;base64,${Buffer.from(
              auth.user.image.data
            ).toString("base64")}`}
            alt="profile image"
          />
        )} */}
        <form onSubmit={handleUpload} encType="multipart/form-data">
          <input id="img-upload" type="file" onChange={handleChange} />
          {file && (
            <button id="img-upload-btn" type="submit">
              update image
            </button>
          )}
        </form>
      </section>
      <section className="follow-req-container">
        <h2>Pending follow requests:</h2>
        {friends?.friendRequests?.length > 0 &&
          friends?.friendRequests.map((friend, index) => {
            return <PendingCard key={index} friend={friend} />;
          })}
      </section>
    </div>
  );
};

export default AccountHome;
