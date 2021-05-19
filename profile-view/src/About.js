import React, { useState, useEffect } from "react";
import "./About.css";
import { useHistory } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import logo from "./Photos/unnamed.png";
function About() {
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);

  const [active, setActive] = useState("about");
  return (
    <div className="about">
      <div className="about__container" method="GET">
        <div className="about__container-left">
          <img src={logo} />
          {/* <img src="https://lh3.googleusercontent.com/proxy/AlNbwTWdcmu5IIISAKVbofZpqwMXRECb1rtCuZsvMnNxYj6ovAjjyrKyO5FgjJ5c7iVtbFMfbizlNjaq9eHs12EunHkBLr6E90xKQJ6fwFdv8uRVXMchS-mJnSPx" /> */}
          <div className="about__socialLinks">
            <p>
              <InstagramIcon />
              Instagram
            </p>
            <p>
              <FacebookIcon />
              Facebook
            </p>
            <p>
              <LinkedInIcon />
              Linkdein
            </p>
            <p>
              <GitHubIcon />
              GitHub
            </p>
          </div>
        </div>
        <div className="about__container-Right">
          <div className="container-top">
            <div className="container__name" method="GET">
              <h4> {userData.name}</h4>
              <h6> {userData.work}</h6>
              <p>RATING : 1/10</p>
            </div>
            {/* <div className="eidprofile__btn">
              <button>Edit Profile</button>
            </div> */}
          </div>
          <div className="conatiner__bottom">
            <span onClick={() => setActive("about")}>About</span>
            <span
              className="spam__timeline"
              onClick={() => setActive("timeline")}
            >
              Timeline
            </span>
            <div>
              {active === "about" && (
                <div className="conatiner__about">
                  <div className="about__text">
                    <p>User ID</p>
                    <p>User Name</p>
                    <p>User Email</p>
                    <p>User Contact</p>
                    <p>User Profession</p>
                  </div>
                  <div className="about__userText">
                    <p>{userData._id}</p>
                    <p>{userData.name}</p>
                    <p> {userData.email}</p>
                    <p> {userData.phoneNo}</p>
                    <p> {userData.work}</p>
                  </div>
                </div>
              )}
              {active === "timeline" && (
                <div className="conatiner__about">
                  <div className="about__text">
                    <p>Experiance</p>
                    <p>Hourly Rate</p>
                    <p>Total projects</p>
                    <p>Language</p>
                    <p>Avaliability</p>
                  </div>
                  <div className="about__userText">
                    <p>Export</p>
                    <p>10$/hr</p>
                    <p>230 Projects</p>
                    <p>Intermidiate</p>
                    <p>3 months</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <forn>
        {/* <h1>{userData._id}</h1>
        <h1>{userData.name}</h1>
        <h1>{userData.email}</h1> */}
      </forn>
    </div>
  );
}

export default About;
