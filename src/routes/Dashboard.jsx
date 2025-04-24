import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  UserPlus,
  PackagePlus,
  List,
  Calendar,
  ShoppingCart,
  RefreshCcw,
  TrendingUp,
  LogOut
} from "lucide-react";
import "../component/Dashboard/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Overview");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Overview", icon: Home, path: "overview" },
    { name: "Add Cashier", icon: UserPlus, path: "add-cashier" },
    { name: "Add Product", icon: PackagePlus, path: "add-product" },
    { name: "View Cashiers", icon: List, path: "view-cashiers" },
    { name: "Cashier Details by Date", icon: Calendar, path: "cashier-by-date" },
    { name: "View Transaction", icon: ShoppingCart, path: "transactions" },
    { name: "Update Stock", icon: RefreshCcw, path: "update-stock" },
    { name: "Sales as per Product", icon: TrendingUp, path: "sales-product" },
    { name: "Sales as per Day", icon: TrendingUp, path: "sales-day" },
    {
      name: "Log Out",
      icon: LogOut,
      action: () => {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <aside className="sidebar">
          <h2>My Supermarket</h2>
          <nav>
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setSelected(item.name);
                    navigate(item.path);
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
      )}

      {/* Main content */}
      <main className="main-content">
        <h1>{selected}</h1>
        <div className="card-container">
          <div className="card">
            <h3>New Subscribers</h3>
            <p>5,097</p>
            <p className="text-green">+33.45%</p>
          </div>
          <div className="card">
            <h3>Streams</h3>
            <p>47,403</p>
            <p className="text-red">-112.45%</p>
          </div>
        </div>
        <div className="progress-container">
          <h3>Audience Satisfaction</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: "76.7%" }}></div>
          </div>
        </div>
        <Outlet />
      </main>

      {/* Mobile navigation */}
      {isMobile && (
        <nav className="bottom-nav">
          {menuItems.slice(0, 5).map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setSelected(item.name);
                navigate(item.path);
              }}
              className={`nav-button ${selected === item.name ? "active" : ""}`}
            >
              <item.icon className="nav-icon" />
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
