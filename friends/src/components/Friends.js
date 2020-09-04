import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Friends = () => {
  const [friends, setFriends] = useState([]);

  const getFriends = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/friends")
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => console.error(err));
  };

  // Get all friends from the API /friends
  useEffect(() => {
    getFriends();
  }, [friends]);

  // TODO Add form to create new friend
  // TODO Create page that displays single user
  // TODO Allow for deletion of user
  // TODO Allow for editing of user

  return (
    <div>
      <h1>Hello Friends</h1>
      {friends.map((friend) => {
        return (
          <div key={friend.id}>
            <h3>{friend.name}</h3>
            <p>{friend.email}</p>
            <p>{friend.age}</p>
            <img src={friend.photoUrl} alt={friend.name} />
          </div>
        );
      })}
    </div>
  );
};

export default Friends;
