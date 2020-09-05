import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/auth-context";

const Logout = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  setLoggedIn(false);
  localStorage.removeItem("token");

  return <Redirect to="/login" />;
};

export default Logout;
