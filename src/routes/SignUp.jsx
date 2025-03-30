import React, { useState } from "react";
import "../component/SignUp/SignUp.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import '../component/Home/Home.css';

const SignupPage = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',          
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-left">
          <h2>Welcome to signup form</h2>
          <p>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
        </div>
        <div className="signup-right">
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />

            <label>Email Address</label>
            <input type="email" name="email" placeholder="johndoe@email.com" required onChange={handleChange} />

            <label>Phone no.</label>
            <input type="text" name="phone" placeholder="+01" required onChange={handleChange}/>

            <label>Password</label>
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />

            <button type="submit">Create an account</button>
          </form>

          <div className="social-signup">
            <p>or</p>
            <p>Signup with these services</p>
          </div>

          <p className="login-link">
            I'm already a member! <a href="/"> Sign In </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;
