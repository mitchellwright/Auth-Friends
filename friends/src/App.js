import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Friends from "./components/Friends";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Hello world</h1>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/friends">Friends</Link>
      </div>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/friends" component={Friends} />
      </Switch>
    </Router>
  );
}

export default App;
