import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../component/Dashboard/Dashboard.css";

export default function CashierDashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2>Cashier Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/cashier-dashboard/view-stock">View Stock</Link>
            </li>
            <li>
              <Link to="/cashier-dashboard/perform-purchase">Perform Purchase</Link>
            </li>
          </ul>
        </nav>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("token"); // Clear the token
            window.location.href = "/login"; // Redirect to login
          }}
        >
          Log Out
        </button>
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}