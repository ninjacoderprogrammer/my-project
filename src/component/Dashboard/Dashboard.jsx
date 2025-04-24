import { useState } from "react";
import { Home, UserPlus, PackagePlus, List, Calendar, ShoppingCart, RefreshCcw, TrendingUp, LogOut } from "lucide-react";
import "./Dashboard.css"; // Import external CSS file

export default function Dashboard() {
  // State to track user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to false to simulate a logged-out user
  
  // State to track the currently selected menu item
  const [selected, setSelected] = useState("Overview");
  
  // Navigation menu items with names and corresponding icons
  const menuItems = [
    { name: "Overview", icon: Home },
    { name: "Add Cashier", icon: UserPlus },
    { name: "Add Product", icon: PackagePlus },
    { name: "View Cashier Details", icon: List },
    { name: "Cashier Details by Date", icon: Calendar },
    { name: "View Transaction", icon: ShoppingCart },
    { name: "Update Stock", icon: RefreshCcw },
    { name: "Sales as per Product", icon: TrendingUp },
    { name: "Sales as per Day", icon: TrendingUp },
    { name: "Log Out", icon: LogOut, action: () => setIsLoggedIn(false) },
  ];

  // If user is not logged in, show login message
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Please log in to access the dashboard.</h2>
        <button className="login-button" onClick={() => setIsLoggedIn(true)}>Log In</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h1>Dashboard</h1>
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  setSelected(item.name);
                }
              }}
              className={`sidebar-button ${selected === item.name ? "active" : ""}`}
            >
              <item.icon className="icon" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content Section */}
      <main className="main-content">
        {/* Displays the currently selected menu item's name */}
        <h2>{selected}</h2>
        <div className="card-container">
          {/* Card Component for New Subscribers */}
          <div className="card">
            <h3>New Subscribers</h3>
            <p>5,097</p>
            <p className="text-green">+33.45%</p>
          </div>
          {/* Card Component for Streams */}
          <div className="card">
            <h3>Streams</h3>
            <p>47,403</p>
            <p className="text-red">-112.45%</p>
          </div>
        </div>
        {/* Audience Satisfaction Progress Bar */}
        <div className="progress-container">
          <h3>Audience Satisfaction</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: "76.7%" }}></div>
          </div>
        </div>
      </main>
    </div>
  );
}
