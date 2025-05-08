import React from "react";
import { Link } from "react-router-dom";
import "../styles/theme.css"; // Global theme

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome</h1>
        <p className="hero-subtitle">Your one-stop solution for all your needs</p>

        <div className="cta-buttons">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3 className="feature-title">Sales Insight</h3>
          <p className="feature-description">Description.</p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Inventory Management</h3>
          <p className="feature-description">Description.</p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Remote Access</h3>
          <p className="feature-description">Description.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;