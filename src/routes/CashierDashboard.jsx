import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/theme.css"; // Use global theme

export default function CashierDashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2 className="sidebar-title">Cashier Dashboard</h2>
        <nav>
          <ul className="sidebar-list">
            <li>
              <Link to="/cashier-dashboard/view-stock" className="sidebar-link">
                View Stock
              </Link>
            </li>
            <li>
              <Link to="/cashier-dashboard/perform-purchase" className="sidebar-link">
                Perform Purchase
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className="btn-secondary logout-button"
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