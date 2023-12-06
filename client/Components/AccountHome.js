import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";
import { getPendingFriends } from "../features/FriendsSlice";
import { getUser } from "../features/authSlice";
import {
  setCroppedImage,
  setUploadStatus,
  setError,
  selectCroppedImage,
  selectUploadStatus,
  selectError,
} from "../features/imageSlice";
import PendingCard from "./PendingCard";

const AccountHome = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const friends = useSelector((state) => state.friends);
  const croppedImage = useSelector(selectCroppedImage);
  const uploadStatus = useSelector(selectUploadStatus);
  const error = useSelector(selectError);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [image, setImage] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    dispatch(
      getPendingFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
  }, []);

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (crop) => {
    setCrop(crop);
  };

  const handleImageLoaded = (image) => {
    imgRef.current = image;
  };

  const handleCropComplete = (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      dispatch(setCroppedImage(croppedImageUrl));
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL("image/jpeg");
  };
  const handleUpload = async (e) => {
    e.preventDefault();

    dispatch(uploadStatus("loading"));

    try {
      const res = await axios.post(
        `/api/users/avatar/${auth.user.id}`,
        { image: croppedImage },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      dispatch(setUploadStatus("success"));
      console.log(res.data);
      // Handle successful upload response here

      // await dispatch(
      //   getUser({
      //     id: auth.user.id,
      //     token: auth.token,
      //   })
      // );
    } catch (err) {
      dispatch(setUploadStatus("failed"));
      dispatch(setError(err.message));
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
        {/* <p>+ update image</p> */}
        {/* <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data"> */}
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleChange}
        />
        {image && (
          <ReactCrop
            src={image}
            crop={crop}
            onChange={handleCrop}
            onComplete={handleCropComplete}
            onImageLoaded={handleImageLoaded}
          />
        )}
        {croppedImage && <img src={croppedImage} alt="cropped image" />}
        <button onClick={handleUpload} disabled={uploadStatus === "loading"}>
          update image
        </button>

        {uploadStatus === "failed" && <div>Error: {error}</div>}

        {/* </form> */}
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
