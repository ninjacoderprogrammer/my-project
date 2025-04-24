// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    console.log('User not logged in, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}


export default ProtectedRoute;