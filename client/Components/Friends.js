import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Friends = () => {
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <form>
        <label>search for friends on Dish it :</label>
        <input
          placeholder="email"
          value={email}
          name="email"
          type="email"
          onChange={handleChange}
        />
        <button type="submit">submit</button>
        <label>or invite friends to join Dish it :</label>
        <input
          placeholder="email"
          value={email}
          name="email"
          type="email"
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form>
      <main>
        <h1>Friends on Dish it :</h1>
        <section>
          <button>X</button>
          <img
            className="profile-img"
            src={friend.imageUrl}
            alt="friend's image"
          />
          <p>{friend.username}</p>
          <p>
            {friend.city}, {friend.state}
          </p>
        </section>
      </main>
    </div>
  );
};

export default Friends;
