import React from "react";
import { Link } from "react-router-dom";
import '../component/Home/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome</h1>
        <p>Your one-stop solution for all your needs</p>
        
        <div className="cta-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h3>Sales Insight</h3>
          <p>Description.</p>
        </div>
        
        <div className="feature-card">
          <h3>Inventory Management</h3>
          <p>Description.</p>
        </div>
        
        <div className="feature-card">
          <h3>Remote Access</h3>
          <p>Description.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;