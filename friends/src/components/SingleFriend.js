import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Transition } from "@tailwindui/react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const SingleFriend = ({ match }) => {
  const { id } = useParams();
  let history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleDelete = async () => {
    await axiosWithAuth()
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    setModalOpen(false);
    setFriend({
      id: null,
      name: "",
      age: null,
      email: "",
    });
    history.push("/friends");
  };

  // Get all friends from the API /friends
  useEffect(() => {
    getFriend();
  }, []);

  // TODO Allow for editing of user

  return (
    <>
      <div className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img
                className="mt-6 mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                src={friend.photoUrl}
                alt={friend.name}
              />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <h3 className="mt-2 text-xl text-center leading-7 font-semibold text-gray-900">
                  {friend.name}
                </h3>
                <p className="text-indigo-600 text-center">{friend.email}</p>

                <p className="mt-3 text-base leading-6 text-gray-500 text-center">
                  Age: {friend.age}
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md shadow-sm justify-end sm:ml-3 sm:w-auto">
                    <button
                      onClick={handleClick}
                      type="button"
                      className="w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Delete friend
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition
        show={modalOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/*<!-- This element is to trick the browser into centering the modal contents. --> */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setModalOpen(false)}
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                  aria-label="Close"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Delete friend
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm leading-5 text-gray-500">
                      Are you sure you want to delete your friend? All of your
                      friend's data will be permanently removed from our servers
                      forever. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Delete friend
                  </button>
                </span>
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    onClick={() => setModalOpen(false)}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default SingleFriend;
