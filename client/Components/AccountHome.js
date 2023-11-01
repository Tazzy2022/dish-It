import React, { useEffect, useState, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingFriends } from "../features/FriendsSlice";
import { updatePhoto } from "../features/authSlice";
import PendingCard from "./PendingCard";

const AccountHome = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const friends = useSelector((state) => state.friends);

  //const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(
      getPendingFriends({
        id: auth.user.id,
        token: auth.token,
      })
    );
  }, []);

  // const handleChange = (e) => {
  //   const fr = new FileReader();
  //   fr.readAsDataURL(e.target.files[0]);

  //   fr.onload = () => {
  //     //console.log("fr.result", fr.result)
  //     setFile(fr.result);
  //   };
  // };

  const fileInput = createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("avatar", fileInput.current.files[0]);
    try {
      await dispatch(
        updatePhoto({
          ...auth.user,
          id: auth.user.id,
          token: auth.token,
          imageUrl: formData,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("FILE", file);
  //   try {
  //     await dispatch(
  //       updatePhoto({
  //         ...auth.user,
  //         id: auth.user.id,
  //         token: auth.token,
  //         imageUrl: file,
  //       })
  //     );
  //   } catch (error) {
  //     console.log("error");
  //   }
  // };

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
          name="avatar"
          ref={fileInput}
          accept="image/*"
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
