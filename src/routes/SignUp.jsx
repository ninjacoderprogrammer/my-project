import React, { useState } from "react";
import "../component/SignUp/SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "cashier", // Default role is 'cashier'
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(response.data.message);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.error) {
        setError(error.response.data.error); // Display backend error message
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-left">
          <h2>Signup Form</h2>
          <p>Fill in the form below to create your account and join our Billing team.</p>
        </div>
        <div className="signup-right">
          <h2>Create an account</h2>
          {error && <p className="error-message">{error}</p>} {/* Display error messages */}
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@email.com"
              required
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            {/* <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="cashier">Cashier</option>
              <option value="admin">Admin</option>
            </select> */}

            <button type="submit">Create an Admin account</button>
          </form>

          <div className="social-signup">
            <p>or</p>
            <p>Signup with these services</p>
          </div>

          <p className="login-link">
            I'm already a member! <a href="/login"> Sign In </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
