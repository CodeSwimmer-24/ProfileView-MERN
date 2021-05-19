import React, { useEffect, useState } from "react";
import "./Contact.css";
import PhoneSharpIcon from "@material-ui/icons/PhoneSharp";
import { TextField } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
function Contact() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    message: "",
  });
  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phoneNo: data.phoneNo,
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userContact();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const { name, email, phoneNo, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNo,
        message,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log("Message not send");
    } else {
      alert("Message send Sucessifully");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <div className="contact">
      <div className="contact__company-details">
        <div className="contact__details">
          <PhoneSharpIcon />
          <div className="contact__detail">
            <h5>Phone</h5>
            <p>+91 61854-2256 / +91 81254</p>
          </div>
        </div>
        <div className="contact__details">
          <EmailIcon />
          <div className="contact__detail">
            <h5>E-Mail</h5>
            <p>democompany@mail.com</p>
          </div>
        </div>
        <div className="contact__details">
          <LocationOnIcon />
          <div className="contact__detail">
            <h5>Address</h5>
            <p>Kolkata, West Bangal 731002</p>
          </div>
        </div>
      </div>
      <div className="contact__container">
        <h1>Get in Touch</h1>
        <div className="contact__customer-details">
          <TextField
            method="POST"
            id="name"
            placeholder="User Name"
            value={userData.name}
            name="name"
            onChange={handleInput}
            type="text"
            margin="normal"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            method="POST"
            id="email"
            name="email"
            placeholder="E-Mail"
            value={userData.email}
            onChange={handleInput}
            type="email"
            margin="normal"
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            method="POST"
            id="phoneNo"
            placeholder="Contact number"
            name="phoneNo"
            value={userData.phoneNo}
            onChange={handleInput}
            type="text"
            margin="normal"
            variant="outlined"
            autoComplete="off"
          />
        </div>
        <div className="message__Box">
          <TextField
            method="POST"
            id="message"
            value={userData.message}
            label="Type your Message..."
            name="message"
            onChange={handleInput}
            type="text-area"
            className="messageBox"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
        </div>
        <div className="send__btn">
          <Button
            type="submit"
            id="login"
            name="login"
            variant="contained"
            color="primary"
            onClick={sendMessage}
            style={{ marginTop: "1rem" }}
          >
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
