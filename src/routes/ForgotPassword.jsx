import React from "react";
import "../styles/theme.css"; // Global theme
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <div className="card forgot-password-box">
        <h2 className="form-title">Forgot Password</h2>
        <p className="form-description">Enter your email to reset your password</p>
        <input type="email" placeholder="Email" className="input-field" />
        <button className="btn-primary">Reset Password</button>
        <p className="form-footer">
          <Link to="/login" className="link">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
