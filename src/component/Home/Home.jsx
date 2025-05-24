import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Specific styles for Home component - NOW THE NEW TWO-COLUMN LAYOUT

const Home = () => {
  return (
    <div className="home-page-wrapper">
      <div className="home-branding-section">
        <h1 className="logo">RetailFlow</h1>
        <p className="tagline">
          Your comprehensive solution for modern retail management. Efficiency, insight, and control at your fingertips.
        </p>
      </div>
      <div className="home-content-section">
        <div className="hero-section">
          <h1 className="hero-title">Welcome to RetailFlow</h1>
          <p className="hero-subtitle">
            Empowering your business with seamless <b>sales processing</b>, insightful <b>analytics</b>, and robust <b>inventory control</b>.
          </p>
          <div className="cta-buttons">
            <Link to="/login" className="btn-primary">
              Get Started
            </Link>
            <Link to="/signup" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <h3 className="feature-title">Advanced Sales Insights</h3>
            <p className="feature-description">
              Visualize sales trends, track top-selling products, and gain actionable insights to boost your retail business performance.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Smart Inventory Management</h3>
            <p className="feature-description">
              Manage product stock in real time, receive low-stock alerts, and ensure you never miss a sale due to inventory shortages.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Seamless Remote Access</h3>
            <p className="feature-description">
              Access your retail dashboard securely from anywhere, enabling you to monitor and control operations on the go.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;