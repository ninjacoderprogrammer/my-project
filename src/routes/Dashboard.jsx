import { Link, Outlet } from "react-router-dom";
// import "../component/Dashboard/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>My Supermarket</h2>
        <Link to="overview" end>Overview</Link>
        <Link to="add-cashier">Add Cashier</Link>
        <Link to="add-product">Add Product</Link> {/* Corrected path */}
        <Link to="view-cashiers">View Cashiers</Link>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("authToken");
            window.location.href = "/login";
          }}
        >
          Log Out
        </button>
      </div>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
