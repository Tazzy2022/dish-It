import React from "react"

const AllFriends = (props) => {

	return (
		<div>
<button>X</button>
          <img
            className="profile-img"
            src={props.friend.imageData}
            alt="friend's image"
          />
          <p>{props.friend.username}</p>
          <p>
            {props.friend.city}, {props.friend.state}
          </p>
		</div>
	)
}

export default AllFriends
