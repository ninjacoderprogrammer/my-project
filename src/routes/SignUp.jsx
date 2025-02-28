import React from "react";
import "../component/SignUp/SignUp.css";
// import '../component/Home/Home.css';

const SignupPage = () => {
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
          <form>
            <label>Full Name</label>
            <input type="text" placeholder="Full Name" required />

            <label>Email Address</label>
            <input type="email" placeholder="johndoe@email.com" required />

            <label>Phone no.</label>
            <input type="text" placeholder="+01" required />

            <label>Password</label>
            <input type="password" placeholder="Password" required />

            <label>Website</label>
            <input type="text" placeholder="Website" />

            <div className="checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I Agree All Statements In Terms Of Service
              </label>
            </div>

            <button type="submit">Create an account</button>
          </form>

          <div className="social-signup">
            <p>or</p>
            <p>Signup with these services</p>
            <div className="social-icons">
              <i className="fab fa-google"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
            </div>
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
