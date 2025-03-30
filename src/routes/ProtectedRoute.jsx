import { Navigate, useOutletContext } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isLoggedIn] = useOutletContext();
  
  if (!isLoggedIn) {
    console.log("Moved Back To Login");
    
    return <Navigate to="/login" />;
  }
  
  return children;
}

export default ProtectedRoute;