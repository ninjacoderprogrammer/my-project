import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Dashboard from "./routes/Dashboard";
import Overview from "./routes/Overview";
import AddCashier from "./routes/AddCashier";
import AddProduct from "./routes/AddProduct";
import ViewCashiers from "./routes/ViewCashiers";
// Add more routes if needed

const token = localStorage.getItem("authToken");
const isAuthenticated = Boolean(token);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          {/* Protected Dashboard */}
          <Route
            path="dashboard"
            element={
              // isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
              <Dashboard />
            }
          >
          </Route>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="add-cashier" element={<AddCashier />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="view-cashiers" element={<ViewCashiers />} />
          <Route path="sales-insight" element={<salesInsight />} />
          <Route path="*" element={<Navigate to="overview" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
