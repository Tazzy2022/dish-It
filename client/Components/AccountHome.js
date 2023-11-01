import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingFriends } from "../features/FriendsSlice";
import { updateUserInfo } from "../features/authSlice";
import PendingCard from "./PendingCard";

const AccountHome = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const friends = useSelector((state) => state.friends);

  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(
      getPendingFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
  }, []);

  const handleChange = (e) => {
    const fReader = new FileReader();
    fReader.readAsDataURL(e.target.value);
    fReader.onloadend = (e) => {
      setImage((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.result,
      }));
    };

    // setImage((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: e.target.value,
    // }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("IMAGE", image.image);
      await dispatch(
        updateUserInfo({
          ...auth.user,
          token: auth.token,
          imageUrl: image,
          // imageUrl: e.target.value,
        })
      );
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <h1 className="user-account-h1">{auth.user.username}'s account</h1>
      <img
        className="profile-img"
        src={auth.user.imageUrl}
        alt="personal image"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
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
