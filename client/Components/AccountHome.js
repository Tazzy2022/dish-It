import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPendingFriends } from "../features/FriendsSlice";
import { updatePhoto } from "../features/authSlice";
import PendingCard from "./PendingCard";

const AccountHome = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const friends = useSelector((state) => state.friends);

  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(
      getPendingFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`/api/users/${auth.user.id}/avatar`, formData, {
        headers: {
          authorization: auth.token,
        },
      });

      // await dispatch(
      //   updatePhoto(
      //     {
      //       userId: auth.user.id,
      //       token: auth.token,
      //       image: upload
      //     }
      //   )
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="user-account-h1">{auth.user.username}'s account</h1>
      {/* <img className="profile-img" src={auth.user.image} alt="personal image" /> */}
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label>update image</label>
        <button type="submit">submit</button>
      </form>
      <p>pending follow requests:</p>
      <section className="follow-req-container">
        {friends?.friendRequests?.length > 0 &&
          friends?.friendRequests.map((friend, index) => {
            return <PendingCard key={index} friend={friend} />;
          })}
      </section>
    </div>
  );
};

export default AccountHome;
