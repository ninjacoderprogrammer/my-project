import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import '../component/Login/LoginCss.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Authentication logic would go here
    // For now just simulate successful login
    setIsLoggedIn(true);
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access your account and explore our services.</p>
        </div>
        <div className="login-right">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">Sign In</button>
            <button className="forgot-button">Forgot Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;