import React from "react";
import '../component/Login/LoginCss.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input type="text" placeholder="Username" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <button className="login-button">Sign In</button>
        <button className="forgot-button">Forgot Password</button>
      </div>
    </div>
  );
};

export default Login;