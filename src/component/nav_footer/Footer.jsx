import React, { useState, useEffect } from 'react';
import './Footer.css'; // Ensure the CSS file is updated with the new theme styles

const Footer = ({ isLoggedIn }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Hide footer when logged in
  useEffect(() => {
    setIsVisible(!isLoggedIn);
  }, [isLoggedIn]);

  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };

  // Don't render at all if not visible
  if (!isVisible) return null;

  return (
    <footer className={`footer ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="footer-toggle" onClick={toggleFooter}>
        <span className="arrow">{isExpanded ? '▼' : '▲'}</span>
      </div>
      <div className="footer-content">
        <p className="footer-copyright">&copy; 2025 MCA Final Year Project</p>
        <div className="footer-links">
          <a href="/about" className="footer-link">About</a>
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
