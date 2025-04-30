import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('Token:', token); // Debugging log

  if (!token) {
    console.log('No token found. Redirecting to login.');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;