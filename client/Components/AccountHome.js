import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPendingFriends } from "../features/FriendsSlice";
import { getUser } from "../features/authSlice";
// import {
//   // setCroppedImage,
//   setUploadStatus,
//   setError,
//   // selectCroppedImage,
//   selectUploadStatus,
//   selectError,
// } from "../features/imageSlice";
import PendingCard from "./PendingCard";

const AccountHome = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const friends = useSelector((state) => state.friends);

  let file;
  let image;

  useEffect(() => {
    dispatch(
      getPendingFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
    // console.log("auth.user.image.data", auth.user.image.data);
    // console.log("auth.user.image.data.length", auth.user.image.data.length);
    // if (auth.user.image.data.length > 0) {
    //   //image = bufferToString(auth.user.image.data);
    //   image = encode(auth.user.image.data);
    // }
  }, []);

  const bufferToString = (buffer) => {
    console.log("HI");
    //convert array buffer to a typed array
    let TYPED_ARRAY = new Uint8Array(buffer);
    console.log("TYPED_ARRAY", TYPED_ARRAY);
    //convert unicode values into a string of characters
    //using .apply() will pass them as list of arguments
    // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY); out of range error
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, "");
    console.log("STRING_CHAR", STRING_CHAR);
    //return base-64 encoded ASCII string
    let base64String = btoa(STRING_CHAR);
    console.log("base64String", base64String);
  };

  const handleChange = (e) => {
    file = e.target.files[0];
    console.log("file", file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("handleUpload");

    try {
      const formData = new FormData();
      console.log("formData", formData);
      formData.append("image", file);
      console.log("formData after image append", formData);
      const res = await axios.post(
        `/api/users/avatar/${auth.user.id}`,
        formData,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      console.log("res.data", res.data);
      // Handle successful upload response here

      // await dispatch(
      //   getUser({
      //     id: auth.user.id,
      //     token: auth.token,
      //   })
      // );
    } catch (err) {
      console.error("error uploading image: ", err);
      // Handle error here
    }
  };

  return (
    <div className="account-home-container">
      <section className="user-account-home">
        <h1 className="user-account-h1">{auth.user.username}</h1>
        <img
          className="account-img"
          // src={auth.user.image}
          alt="personal image"
        />
        <form onSubmit={handleUpload} encType="multipart/form-data">
          <input
            type="file"
            // name="file"
            // accept="image/*"
            onChange={handleChange}
          />
          {/* {image && (
          <ReactCrop
            src={image}
            crop={crop}
            onChange={handleCrop}
            onComplete={handleCropComplete}
            onImageLoaded={handleImageLoaded}
          />
        )} */}
          {/* {croppedImage && <img src={croppedImage} alt="cropped image" />} */}
          <button type="submit">update image</button>
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
