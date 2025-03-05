import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from 'axios';
import '../component/Login/LoginCss.css';

const Login = () => {
  // Get authentication state from context
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email || !password) {
      console.log("Please enter both email and password");
      return;
    }
    
    axios.post('http://localhost:3000/login', { email, password })
      .then(result => {
        console.log("result:", result);
        if (result.status === 200) {
          // Update global login state
          setIsLoggedIn(true);
          
          // Store user in localStorage for persistence
          localStorage.setItem("isLoggedIn", "true");
          
          // Navigate to dashboard after successful login
          navigate('/dashboard');
        }
      })
      .catch(err => console.log(err));
  };
  
  const handleForgotPassword = (e) => {
    e.preventDefault(); // Prevent form submission
    // Add your forgot password logic here
    console.log("Forgot password clicked");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="forgot-button" onClick={handleForgotPassword}>
            Forgot Password
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;