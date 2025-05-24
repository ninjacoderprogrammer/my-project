import React from "react";
import { Link } from "react-router-dom";
import "../../styles/theme.css"; // Global theme for consistent styling
import "./Home.css"; // Specific styles for Home component

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome</h1>
        <p className="hero-subtitle">Your one-stop solution for all your <b>Retail</b> needs</p>

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
          <p className="feature-description">
            Visualize sales trends, track top-selling products, and gain actionable insights to boost your retail business performance.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Inventory Management</h3>
          <p className="feature-description">
            Manage product stock in real time, receive low-stock alerts, and ensure you never miss a sale due to inventory shortages.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Remote Access</h3>
          <p className="feature-description">
            Access your retail dashboard securely from anywhere, enabling you to monitor and control operations on the go.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;