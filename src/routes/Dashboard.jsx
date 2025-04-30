import { Link, Outlet } from "react-router-dom";
import "../component/Dashboard/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2>Dashboard Menu</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/cashier-management">Cashier Management</Link>
            </li>
            <li>
              <Link to="/dashboard/product-management">Product Management</Link>
            </li>
            <li>
              <Link to="/dashboard/sales-insight">Sales Insight</Link>
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
