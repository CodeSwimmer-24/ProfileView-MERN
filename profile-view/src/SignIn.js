import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./SignIn.css";
import { Link, useHistory } from "react-router-dom";
function SignIn() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    work: "",
    phoneNo: "",
    password: "",
    conPassword: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phoneNo, work, password, conPassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNo,
        work,
        password,
        conPassword,
      }),
    });
    const data = res.json();
    if (res.status == 422 || !data) {
      window.alert("Please Enter Proper Details");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Sucessfull");
      console.log("Registration Sucessfull");
      history.push("/login");
    }
  };

  return (
    <div className="signIn">
      <div className="signIn__container">
        <div className="signIn__image">
          <img src="https://cuc.mponline.gov.in/Portal/Services/CU/newcss/images/loginbg.png" />
          <Link to="/login" className="signin__registerLink">
            <p>I am already Register</p>
          </Link>
        </div>
        <div method="POST" className="signIn__form">
          <h1>Sign Up</h1>
          <TextField
            id="name"
            value={user.name}
            onChange={handleInput}
            label="User Name"
            name="name"
            //   onChange={}
            type="text"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            id="email"
            label="Email Id"
            name="email"
            value={user.email}
            onChange={handleInput}
            //   onChange={}
            type="email"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            id="phoneNo"
            label="Mobile Number"
            name="phoneNo"
            value={user.phoneNo}
            onChange={handleInput}
            //   onChange={}
            type="text"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            id="work"
            label="Your Profession"
            name="work"
            value={user.work}
            onChange={handleInput}
            //   onChange={}
            type="text"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            value={user.password}
            onChange={handleInput}
            //   onChange={}
            type="password"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            id="conPassword"
            label="Conform Password"
            name="conPassword"
            value={user.conPassword}
            onChange={handleInput}
            //   onChange={}
            type="password"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <div className="signIn__btn">
            <Button
              type="submit"
              id="signUp"
              name="singUp"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
              onClick={postData}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
