import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllFriends from "./AllFriends";
import { getFriendsList, inviteFriends } from "../features/FriendsSlice";

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends);
  const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState({ email: "" });
  const [modalOpen, setModalOpen] = useState(false);

  let tempEmail;

  useEffect(() => {
    dispatch(
      getFriendsList({
        id: auth.user.id,
        token: auth.token,
      })
    );
  }, []);

  const handleChange = (e) => {
    setEmail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //
  ////
  //also need to confirm they're not submitting their own email to break my site
  const findFriends = async (e) => {
    e.preventDefault();
    tempEmail = email;
    const found = friends.friends.find(
      (friend) => friend.email === email.email
    );
    if (found) {
      //throw this info into a modal
      console.log("Oops. it looks like you're already friends with that user");
      setEmail({ email: "" });
    } else {
      const invite = await dispatch(
        inviteFriends({
          token: auth.token,
          email: email,
        })
      );
      if (invite.payload) {
        //throw this info into a modal
        console.log("here she is! do you want to add her??");
      } else {
        //throw this info into a modal
        console.log(
          "Could not find anyone with that email. Would you like us to send {email} an invite from you to sign up for Dish it?"
        );
      }
    }
    setEmail({ email: "" });
  };

  return (
    <div>
      <form onSubmit={findFriends}>
        <label>search for friends on Dish it :</label>
        <input
          placeholder="email"
          value={email.value}
          name="email"
          type="email"
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form>
      <main>
        <h1>Friends on Dish it :</h1>
        {friends?.friends.length > 0 &&
          friends.friends.map((friend) => {
            return <AllFriends key={friend.id} friend={friend} />;
          })}
      </main>
    </div>
  );
};

export default Friends;
