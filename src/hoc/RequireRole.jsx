import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireRole = ({ role, children }) => {
  const userRole = localStorage.getItem('role'); // Retrieve the user's role from localStorage
  console.log('User Role:', userRole); // Debugging log
  console.log('Required Role:', role); // Debugging log

  if (!userRole) {
    console.log('No role found. Redirecting to login.');
    return <Navigate to="/login" replace />;
  }

  if (userRole !== role) {
    console.log('Role mismatch. Redirecting to unauthorized.');
    return <Navigate to="/unauthorized" replace />;
  }

  return children; // Render the children if the role matches
};

export default RequireRole;