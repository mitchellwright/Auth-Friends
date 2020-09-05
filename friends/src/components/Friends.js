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
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 ">
        <div className="space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl">
              Meet our Friends
            </h2>
          </div>
          <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
            {friends.map((friend) => {
              return (
                <li key={friend.id}>
                  <div className="space-y-6">
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                      src={friend.photoUrl}
                      alt={friend.name}
                    />
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h4>{friend.name}</h4>
                        <p className="text-indigo-600">{friend.email}</p>
                        <p className="text-xl leading-7 text-gray-500">
                          Age: {friend.age}
                        </p>
                        <Link to={`/friends/${friend.id}`}>
                          <button
                            type="button"
                            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
                          >
                            View {friend.name.split(" ")[0]}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Friends;
