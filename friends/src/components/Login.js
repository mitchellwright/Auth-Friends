import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
  });
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
        history.push("/friends");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Hello Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={formInputs.username}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formInputs.password}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
