import React from "react";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./App";
function Navbar() {
  const { state, dispatch } = useContext(userContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li className="nav-item ">
            <NavLink exact to="/" className="nav-links  ">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-links ">
              About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/contact" className="nav-links ">
              Contact
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/logout" className="nav-links ">
              LogOut
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item ">
            <NavLink exact to="/" className="nav-links  ">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-links ">
              About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/contact" className="nav-links ">
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-links ">
              LogIn
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signIn" className="nav-links ">
              SignIn
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <div className="navbar">
      <navbar>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <h2>Ney X</h2>
          </Link>
          <div className="menu__item">
            <ul className="nav-menu ">
              <RenderMenu />
            </ul>
          </div>
        </div>
        <hr />
      </navbar>
    </div>
  );
}

export default Navbar;
