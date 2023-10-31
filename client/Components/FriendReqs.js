import React from "react";
import { useDispatch, useSelector } from "react-redux";

const FriendReqs = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <main>
        <h1>Pending friend requests :</h1>
        <h2>Sent:</h2>

        <h2>Received:</h2>
      </main>
    </div>
  );
};

export default FriendReqs;
