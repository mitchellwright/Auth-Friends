import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Transition } from "@tailwindui/react";
import logo from "../friends-logo.png";
import { AuthContext } from "../contexts/auth-context";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src={logo}
                alt="Friends logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src={logo}
                alt="Friends logo"
              />
            </div>
            <div className="hidden sm:-my-px sm:ml-6 space-x-8 sm:flex">
              <NavLink
                to="/friends"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                activeClassName="border-indigo-500 text-gray-900 hover:text-gray-900 hover:border-indigo-500 focus:outline-none focus:border-indigo-700"
              >
                Friends
              </NavLink>

              <NavLink
                to={localStorage.getItem("token") ? "/logout" : "/login"}
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                activeClassName="border-indigo-500 text-gray-900 hover:text-gray-900 hover:border-indigo-500 focus:outline-none focus:border-indigo-700"
              >
                {localStorage.getItem("token") ? "Log out" : "Log in"}
              </NavLink>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg
                  className="hidden h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="hidden h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <Transition show={isOpen}>
        <div className="pt-2 pb-3 space-y-1">
          <NavLink
            to="/friends"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
            activeClassName="border-indigo-500 text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700"
          >
            Friends
          </NavLink>

          <NavLink
            to={localStorage.getItem("token") ? "/logout" : "/login"}
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
            activeClassName="border-indigo-500 text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700"
          >
            to={localStorage.getItem("token") ? "Log out" : "Log in"}
          </NavLink>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div
            className="mt-3 space-y-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <NavLink
              to="/login"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
              activeClassName="border-indigo-500 text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700"
              role="menuitem"
            >
              Sign out
            </NavLink>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;
