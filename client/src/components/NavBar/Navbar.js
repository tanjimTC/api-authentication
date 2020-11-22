import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
const Navbar = () => {
  const hide = () => {
    let aria = document
      .getElementById("collapsed")
      .getAttribute("aria-expanded");
    if (aria === "true") {
      let element = document.getElementById("navbarNav");
      element.classList.remove("show");
      let x = document.getElementById("collapsed");
      x.classList.add("collapsed");
    }
  };
  return (
    <nav className="navbar p-0 navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand " to="/">
          <img
            className="img-fluid w-25 mx-auto"
            src="https://dl.dropboxusercontent.com/s/t2ffhelqzef57eo/1ff97c31-2647-405c-ac0b-6159d446aa33_200x200.png?dl=0"
            alt=""
          />
        </Link>
        <button
          id="collapsed"
          className="navbar-toggler navbar-toggler-right collapsed mr-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* <span class="navbar-toggler-icon"></span> */}
          <span> </span>
          <span> </span>
          <span> </span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-a" to="/deshboard" onClick={() => hide()}>
                Deshboard
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-a" to="/signup" onClick={() => hide()}>
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-a" to="/signin" onClick={() => hide()}>
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-a" to="/" onClick={() => hide()}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
