import { NavLink, Outlet } from "react-router-dom";
import "../component/Dashboard/Dashboard.css";


export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>My Supermarket</h2>
        <NavLink to="overview" end>Overview</NavLink>
        <NavLink to="add-cashier">Add Cashier</NavLink>
        <NavLink to="add-product">Add Product</NavLink>
        <NavLink to="view-cashiers">View Cashiers</NavLink>
        {/* more links */}
        <button onClick={() => {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }}>Log Out</button>
      </aside>
      <main className="main-content">
        <h1>View Cashier Details</h1>
        {/* stat cards, progress bar, table as before */}
        <Outlet />
      </main>
    </div>
  );
}
