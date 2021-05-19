import React, { useEffect, useState } from "react";
import "./Home.css";
function Home() {
  const [userData, setUserData] = useState("");
  const [show, setShow] = useState(false);
  const userHome = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({ ...userData, name: data.name });
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userHome();
  }, []);

  return (
    <div className="home" method="GET" name="name">
      <img src="https://imgs.bharatmatrimony.com/bmimgs/login/login-otp-banner.png" />
      <center className="home__text">
        <h4>WELCOME</h4>
        <h1>{userData.name}</h1>
        <h5>
          {show
            ? "Happy to see you "
            : "Register your self & view your details by visiting about section."}
        </h5>
      </center>
    </div>
  );
}

export default Home;
