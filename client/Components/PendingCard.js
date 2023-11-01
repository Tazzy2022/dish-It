import React from "react"

const PendingCard = (props) => {

	return (
		<div>
<button>X</button>
          <img
            className="profile-img"
            src={props.friend.imageUrl}
            alt="friend's image"
          />
          <p>{props.friend.username}</p>
          <p>
            {props.friend.city}, {props.friend.state}
          </p>
					<button>+</button><label>accept</label>
		</div>
	)
}

export default PendingCard
