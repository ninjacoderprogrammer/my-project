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
    <form onSubmit={handleLogin}>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
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
        </div>
      </div>
    </form>
  );
};

export default Login;