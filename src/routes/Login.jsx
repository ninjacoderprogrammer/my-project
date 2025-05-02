import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../component/Login/LoginCss.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role is "admin"
  const [error, setError] = useState(""); // State to handle error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password, role });
      localStorage.setItem('token', response.data.token); // Save the token
      localStorage.setItem('role', response.data.role); // Save the user's role

      // Redirect based on role
      if (response.data.role === 'admin') {
        navigate('/dashboard'); // Admin will be redirected to Sales Insights
      } else if (response.data.role === 'cashier') {
        navigate('/cashier-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>} {/* Display error messages */}
          <input
            type="text"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="role-selection">
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="cashier"
                checked={role === "cashier"}
                onChange={(e) => setRole(e.target.value)}
              />
              Cashier
            </label>
          </div>
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="forgot-button">Forgot Password</button>
          <p className="SignUp-link">
            I'm Not a member! <a href="/SignUp"> Sign Up </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;