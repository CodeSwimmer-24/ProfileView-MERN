import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Login.css";
import { userContext } from "./App";
import { useContext } from "react";
function Login() {
  // Context API for hiding Login page

  const { state, dispatch } = useContext(userContext);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Wrong Details");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Sucessfull");
      history.push("/");
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__image">
          <img src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?size=338&ext=jpg" />
        </div>
        <div className="login__form" method="POST">
          <h1>LogIn</h1>
          <TextField
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Id"
            name="email"
            //   onChange={}
            type="email"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            name="password"
            //   onChange={}
            type="password"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <Button
            type="submit"
            id="login"
            name="login"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            onClick={loginUser}
          >
            LogIn
          </Button>
          <Link to="/signIn" className="login__registerLink">
            <p>Create Account</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
