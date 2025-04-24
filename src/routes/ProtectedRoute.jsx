// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

export default function ProtectedRoute() {
  // 1. Grab the auth flag from Outlet context
  const [ isLoggedIn ] = useOutletContext();

  // 2. If not logged in, kick them back to /login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 3. Otherwise render the nested route(s)
  return <Outlet />;
}
