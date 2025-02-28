import React from "react";
import { useOutletContext } from "react-router-dom";

function Dashboard() {
  const [isLoggedIn] = useOutletContext();
  
  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard</h1>
      <p>Open after logging in</p>
      {/* Dashboard content here */}
    </div>
  );
}

export default Dashboard;