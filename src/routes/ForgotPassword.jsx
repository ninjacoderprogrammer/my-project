import React from "react";
import "./ForgotPasswordCss.css";
import { Link } from "react-router-dom";


const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p>Enter your email to reset your password</p>
        <input type="email" placeholder="Email" className="input-field" />
        <button className="reset-button">Reset Password</button>
        <p className="back-to-login">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;