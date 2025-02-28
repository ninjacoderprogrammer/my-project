import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";


function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Hamburger menu button */}
      <div className="menu-button" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar navigation */}
      <nav className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="close-button" onClick={closeSidebar}>×</div>
        <ul>
          <li><Link to="/home" onClick={closeSidebar}>Home</Link></li>
          <li><Link to="/about" onClick={closeSidebar}>About</Link></li>
          <li><Link to="/contact" onClick={closeSidebar}>Contact</Link></li>
          <li><Link to="/login" onClick={closeSidebar}>Login</Link></li>
          <li><Link to="/signup" onClick={closeSidebar}>Sign Up</Link></li>
        </ul>
      </nav>
    </>
  );
};


export default NavBar;
