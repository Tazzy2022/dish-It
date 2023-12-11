import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPendingFriends } from "../features/FriendsSlice";
import { getUser } from "../features/authSlice";
import { Buffer } from "buffer";
import PendingCard from "./PendingCard";

const AccountHome = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const friends = useSelector((state) => state.friends);
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    dispatch(
      getPendingFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
  }, [file]);

  // const resizeFile = (file) => {
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       200,
  //       200,
  //       100,
  //       0,
  //       "JPEG",
  //       (uri) => {
  //         resolve(uri);
  //       },
  //       "base64"
  //     );
  //     console.log("file after resize", file);
  //   });
  // };

  const handleChange = (e) => {
    setFile(e.target.files[0]);

    // if (file) {
    //   try {
    //     setImage(resizeFile(file))
    //     console.log("image", image);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
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
        {auth.user.image === null ? (
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
        )}
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
