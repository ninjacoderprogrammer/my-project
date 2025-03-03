import React, { useState } from "react";
import "../component/SignUp/SignUp.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import '../component/Home/Home.css';

const SignupPage = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register',{name,email,phone,password})
        .then(result=> {console.log(result)
          navigate('/login')
        })
        .catch(err=> console.log(err))
    }

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
            <input type="text" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} />

            <label>Email Address</label>
            <input type="email" placeholder="johndoe@email.com" required onChange={(e) => setEmail(e.target.value)} />

            <label>Phone no.</label>
            <input type="text" placeholder="+01" required onChange={(e) => setPhone(e.target.value)}/>

            <label>Password</label>
            <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />

            {/* <label>Website</label>
            <input type="text" placeholder="Website" /> */}

            {/* <div className="checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I Agree All Statements In Terms Of Service
              </label>
            </div> */}

            <button type="submit">Create an account</button>
          </form>

          <div className="social-signup">
            <p>or</p>
            <p>Signup with these services</p>
            {/* <div className="social-icons">
              <i className="fab fa-google"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
            </div> */}
          </div>

          <p className="login-link">
            I'm already a member! <a href="#">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
