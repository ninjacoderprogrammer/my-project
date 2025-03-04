import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = ({ isLoggedIn }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Hide footer when logged in
  useEffect(() => {
    if (isLoggedIn) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [isLoggedIn]);

  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };

  // Don't render at all if not visible
  if (!isVisible) return null;

  return (
    <footer className={`footer ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="footer-toggle" onClick={toggleFooter}>
        <span className="arrow">{isExpanded ? "▼" : "▲"}</span>
      </div>
      <div className="footer-content">
        <p>&copy; MCA Final Year Project</p>
        <div className="footer-links">
        </div>
      </div>
    </footer>
  );
};

export default Footer;
