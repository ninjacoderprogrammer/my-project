import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../styles/theme.css'; // Global theme
import '../component/Login/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password, role });
      // Save the token
      localStorage.setItem('token', response.data.token);
      // Save the user's role
      localStorage.setItem('role', response.data.role); 

      // Redirect based on role
      if (response.data.role === 'admin') {
        navigate('/dashboard'); // Admin will be redirected to Sales Insights
      } else if (response.data.role === 'cashier') {
        navigate('/cashier-dashboard');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="card login-form">
      <h2 className="form-title">Login</h2>
      {error && <p className="form-message error">{error}</p>}
      <input
        type="text"
        placeholder="Email"
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="role-selection">
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === 'admin'}
            onChange={(e) => setRole(e.target.value)}
          />
          Admin
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="cashier"
            checked={role === 'cashier'}
            onChange={(e) => setRole(e.target.value)}
          />
          Cashier
        </label>
      </div>
      <button type="submit" className="btn-primary">
        Login
      </button>
      <button type="button" className="btn-secondary">
        Forgot Password
      </button>
      <p className="form-footer">
        I'm not a member! <a href="/SignUp" className="link"><b>Sign Up</b></a>
        <span style={{ margin: '0 8px' }}>|</span>
        <a href="/" className="link"><b>Home</b></a>
      </p>
    </form>
  );
};

export default Login;