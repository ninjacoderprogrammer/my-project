import { Link, Outlet } from "react-router-dom";
import "../styles/theme.css"; // Global theme

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2 className="sidebar-title">Dashboard Menu</h2>
        <nav>
          <ul className="sidebar-list">
            <li>
              <Link to="/dashboard/cashier-management" className="sidebar-link">
                Cashier Management
              </Link>
            </li>
            <li>
              <Link to="/dashboard/product-management" className="sidebar-link">
                Product Management
              </Link>
            </li>
            <li>
              <Link to="/dashboard/sales-insight" className="sidebar-link">
                Sales Insight
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
