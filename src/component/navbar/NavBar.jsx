import React from "react";
import "./navbar.css";

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign Up</a></li>
          <li><a href="/help">Help</a></li>
        </ul>
      </nav>
      <footer className="footer">
        <p>&copy; MCA 2023 Batch Final Project</p>
      </footer>
    </>
  );
};

export default NavBar;