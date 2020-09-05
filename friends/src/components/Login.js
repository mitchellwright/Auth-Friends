import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/auth-context";

const Login = () => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
  });
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  let history = useHistory();

  const handleChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", formInputs)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        setLoggedIn(true);
        history.push("/friends");
      })
      .catch((err) => console.error(err));
  };

  if (loggedIn) {
    return <Redirect to="/friends" />;
  }

  return (
    <>
      <div className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div>
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              <div>
                <input
                  aria-label="Email address"
                  name="username"
                  type="text"
                  id="username"
                  onChange={handleChange}
                  value={formInputs.username}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Username"
                />
              </div>
              <div className="-mt-px">
                <input
                  id="password"
                  onChange={handleChange}
                  value={formInputs.password}
                  aria-label="Password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
