import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const SingleFriend = ({ match }) => {
  const { id } = useParams();
  const [friend, setFriend] = useState({
    id: null,
    name: "",
    age: null,
    email: "",
  });

  const getFriend = () => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/friends/${id}`)
      .then((res) => {
        setFriend(res.data);
      })
      .catch((err) => console.error(err));
  };

  // Get all friends from the API /friends
  useEffect(() => {
    getFriend();
  }, []);

  // TODO Allow for deletion of user
  // TODO Allow for editing of user

  return (
    <div>
      <h1>Hello Single Friend</h1>
      <div>
        <h3>{friend.name}</h3>
        <p>{friend.email}</p>
        <p>{friend.age}</p>
      </div>
    </div>
  );
};

export default SingleFriend;
