import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../component/Login/LoginCss.css';

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3001/login',{email,password})
      .then(result=> {
        console.log("result : ",result)
        if(result.status === 200){
          navigate('/home')
        }
        
      })
      .catch(err=> console.log(err))
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Email"
            className="input-field"
            // value={username}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
          <button className="forgot-button">Forgot Password</button>
        </div>
      </div>
    </form>
  );
};

export default Login;