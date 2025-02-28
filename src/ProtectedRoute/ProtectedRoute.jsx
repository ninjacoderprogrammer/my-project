import { Navigate, useOutletContext } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isLoggedIn] = useOutletContext();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

export default ProtectedRoute;