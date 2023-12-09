import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllFriends from "./AllFriends";
import { getFriendsList, findFriend } from "../features/FriendsSlice";
import FriendModal from "./FriendModal";
import ContentModal from "./ContentModal";

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends);
  const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [popUpSeen, setPopUpSeen] = useState(false);
  const [error, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    tempEmail = email;

    const found = friends.friends.find((friend) => friend.email === email);
    if (found) {
      setErrorMessage(
        "Oops. it looks like you're already friends with that user"
      );
      setErrorModal(true);
    } else if (email === auth.user.email) {
      setErrorModal(true);
      setErrorMessage("Sorry, you can't add yourself as a friend");
    } else {
      getFriend();
    }
    e.target.reset();
  };

  const getFriend = async () => {
    try {
      const invite = await dispatch(
        findFriend({
          token: auth.token,
          email: email,
        })
      );
      if (invite.payload.username) {
        setPopUpSeen(true);
      } else {
        setErrorModal(true);
        setErrorMessage(`${tempEmail} is not registered on Dish it.`);
      }
    } catch (error) {}
  };

  return (
    <div id="friend-contnr">
      <form id="find-friend" onSubmit={handleSubmit}>
        <div>
          <label>search for friends on Dish it :</label>
        </div>
        <div className="email-input">
          <input
            placeholder="email"
            value={email.value}
            name="email"
            type="email"
            onChange={handleChange}
          />
          <button className="email-input-btn" type="submit">submit</button>
        </div>
      </form>
      {popUpSeen && (
        <FriendModal openPopUp={setPopUpSeen} friend={friends.friend} />
      )}
      {error && (
        <ContentModal openErrorModal={setErrorModal} content={errorMessage} />
      )}
      <main>
        <h1 id="friend-h1">Friends on Dish it :</h1>
        {friends?.friends.length > 0 &&
          friends.friends.map((friend, index) => {
            return <AllFriends key={index} friend={friend} />;
          })}
      </main>
    </div>
  );
};

export default Friends;
