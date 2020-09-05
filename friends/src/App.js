import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Friends from "./components/Friends";
import Navbar from "./components/Navbar";
import SingleFriend from "./components/SingleFriend";
import { AuthContext } from "./contexts/auth-context";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
        <div className="App">
          <div className="min-h-screen bg-white">
            <Navbar />
            <div className="py-10">
              <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  {/* <!-- Replace with your content --> */}
                  <Switch>
                    <Route path="/login">
                      <Login />
                    </Route>
                    <Route path="/logout">
                      <Logout />
                    </Route>
                    <PrivateRoute path="/friends/:id">
                      <SingleFriend />
                    </PrivateRoute>
                    <PrivateRoute path="/friends">
                      <Friends />
                    </PrivateRoute>
                    <Route path="/">
                      {loggedIn ? (
                        <Redirect to="/friends" />
                      ) : (
                        <Redirect to="/login" />
                      )}
                    </Route>
                  </Switch>
                  {/* <!-- /End replace --> */}
                </div>
              </main>
            </div>
          </div>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
