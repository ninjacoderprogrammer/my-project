import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/theme.css"; // Global theme
import "./Login.css"; // Component-specific styles - NOW THE NEW TWO-COLUMN LAYOUT
import config from "../../config/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(
        `${config.BACKEND_SERVER_URL}/api/auth/login`,
        { email, password, role }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      // Handle "Remember Me" logic here if needed (e.g., save email or token differently)

      if (response.data.role === "admin") {
        navigate("/dashboard");
      } else if (response.data.role === "cashier") {
        navigate("/cashier-dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-branding-section">
        <h1 className="logo">RetailFlow</h1> {/* Optional Logo */} 
        <p className="welcome-text">
          Welcome back! Streamline your retail operations with ease.
        </p>
      </div>

      <div className="login-form-section">
        <div className="login-card-container">
          <h2 className="form-title">Sign In</h2>
          {error && <p className="form-message error">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              {/* <label htmlFor="email">Email</label> Optional explicit label */}
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              {/* <label htmlFor="password">Password</label> Optional explicit label */}
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot password?
              </Link>
            </div>
            
            {/* Role Selection - Kept from previous version, styled to fit if needed */}
            {/* Consider if role selection is still desired in this new design */}
            {/* If so, it might need specific styling within .input-group or a new div */}
            <div className="input-group role-selection-group"> {/* Added a wrapper for styling */}
              <p className="role-selection-title">Login as:</p> {/* Optional title for clarity */}
              <div className="role-options">
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
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={!email || !password} /* Optional: Disable button if fields are empty */
            >
              Login
            </button>
          </form>
          <p className="form-footer-message">
            Don’t have an account?{" "}
            <Link to="/SignUp" className="signup-link">
              Sign Up
            </Link>
            <span className="form-footer-separator" style={{ margin: "0 8px" }}>|</span>
            <Link to="/" className="signup-link">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;