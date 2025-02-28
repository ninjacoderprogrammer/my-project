import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";


function NavBar() {

  
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

  return (
    <nav className="navbar">
    <div className="nav-container">
      <h2 className="logo">My Website</h2>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
    </ul>
    </div>
  </nav>
  );
};


export default NavBar;
