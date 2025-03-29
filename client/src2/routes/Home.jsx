import React from "react";
import { Link } from "react-router-dom";
import '../component/Home/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Effortless Billing, Smarter Shopping</h1>
        <p>Speed up checkouts, reduce errors, and maximize efficiency with our system</p>
        
        <div className="cta-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h1>Smart Billing</h1>
          <p>Generate detailed bills with product-wise breakdown, tax calculation, and automatic discounts. Supports multiple payment methods like cash, card, and UPI.</p>
        </div>
        
        <div className="feature-card">
          <h1>Inventory Management</h1>
          <p>Track product stock in real-time, manage categories, get low-stock alerts, and update inventory automatically after each sale.</p>
        </div>
        
        <div className="feature-card">
          <h1>Sales Analytics</h1>
          <p>View daily, weekly, or monthly sales reports with charts. Monitor top-selling items, revenue trends, and employee performance.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;