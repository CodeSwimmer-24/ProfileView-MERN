import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import SignIn from "./SignIn";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Logout from "./Logout";
import { createContext, useReducer } from "react";

import { initialState, reducer } from "./Reducer/UseReducer";
export const userContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <userContext.Provider value={{ state, dispatch }}>
        <Router>
          <Switch>
            <Route path="/logout">
              <Navbar />
              <Logout />
            </Route>
            <Route path="/login">
              <Navbar />
              <Login />
            </Route>
            <Route path="/SignIn">
              <Navbar />
              <SignIn />
            </Route>
            <Route path="/contact">
              <Navbar />
              <Contact />
            </Route>
            <Route path="/about">
              <Navbar />
              <About />
            </Route>
            <Route path="/">
              <Navbar />
              <Home />
            </Route>
            <Route path="">
              <Navbar />
              <ErrorPage />
            </Route>
          </Switch>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
