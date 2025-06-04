import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/theme.css';
import './signup.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'cashier',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add signup logic here
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-branding-section">
        <h1 className="logo">RetailFlow</h1>
        <p className="welcome-text">
          Welcome! Create your account to streamline your retail operations.
        </p>
      </div>
      <div className="login-form-section">
        <div className="login-card-container">
          <h2 className="form-title">Sign Up</h2>
          {error && <p className="form-message error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Sign Up
            </button>
          </form>
          <p className="form-footer-message">
            I'm already a member.{' '}
            <Link to="/Login" className="signup-link">
              Login
            </Link>
            <span className="form-footer-separator" style={{ margin: '0 8px' }}>|</span>
            <Link to="/" className="signup-link">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
