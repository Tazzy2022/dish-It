import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllFriends from "./AllFriends";
import { getFriendsList, inviteFriends } from "../features/FriendsSlice";
import FriendModal from "./FriendModal";
import ContentModal from "./ContentModal"

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends);
  const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState({ email: "" });
  const [popUpSeen, setPopUpSeen] = useState(false);
  const [error, setErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email.email", email.email, "auth.user.email", auth.user.email);
    tempEmail = email.email;

    const found = friends.friends.find(
      (friend) => friend.email === email.email
    );
    if (found) {
      setEmail({ email: "" });
      setErrorMessage("Oops. it looks like you're already friends with that user")
      setErrorModal(true)
    } else if (email.email === auth.user.email) {
      setEmail({ email: "" });
      setErrorModal(true)
      setErrorMessage("Sorry, you can't add yourself as a friend")
    } else {
      findFriend();
    }
    setEmail({ email: "" });
  };

  const findFriend = async () => {
    try {
      const invite = await dispatch(
        inviteFriends({
          token: auth.token,
          email: email,
        })
      );
      if (invite.payload.username) {
        setPopUpSeen(true);
        console.log("here she is! do you want to add her??");
      } else {
        //throw this info into a modal
        console.log(
          `Could not find ${tempEmail}. Do you want us to send them an email invite to Dish it?`
        );
      }
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
      {popUpSeen && (
        <FriendModal openPopUp={setPopUpSeen} friend={friends.friendInvited} />
      )}
      {error && (
        <ContentModal openErrorModal={setErrorModal} content={errorMessage}/>
      )}
      <main>
        <h1>Friends on Dish it :</h1>
        {friends?.friends.length > 0 &&
          friends.friends.map((friend, index) => {
            return <AllFriends key={index} friend={friend} />;
          })}
      </main>
    </div>
  );
};

export default Friends;
