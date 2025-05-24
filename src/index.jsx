import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css';

import App from "./App";
import Home from "./component/Home/Home";
import Contact from "./component/Contact/Contact";
import Login from "./component/Login/Login";
import SignUp from "./component/signup/SignUp";
import Dashboard from "./component/adminDashboard/Dashboard"; // Admin Dashboard
import CashierDashboard from "./component/cashierDashboard/CashierDashboard.jsx";
import CashierManagement from "./component/cashierManagement/CashierManagement";
import ProductManagement from "./component/productManagement/ProductManagement.jsx";
import SalesInsight from "./component/salesInsight/SalesInsight.jsx";
import ViewStock from "./component/viewStock/ViewStock.jsx";
import PerformPurchase from "./component/performPurchase/PerformPurchase.jsx";
import PrintBill from "./component/print-bill/PrintBill.jsx";
import RequireAuth from "./hoc/RequireAuth";
import RequireRole from "./hoc/RequireRole";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes> 
        {/* Public Routes */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

       {/* Admin Dashboard */}
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <RequireRole role="admin">
                <Dashboard />
              </RequireRole>
            </RequireAuth>
          }
        >
          {/* Redirect admin to Sales Insights */}
          <Route index element={<Navigate to="sales-insight" replace />} />

          {/* Admin-specific routes */}
          <Route
            path="cashier-management"
            element={<CashierManagement />}
          />
          <Route
            path="product-management"
            element={<ProductManagement />}
          />
          <Route
            path="sales-insight"
            element={<SalesInsight />}
          />
        </Route>

        {/* Cashier Dashboard */}
        <Route
          path="cashier-dashboard"
          element={
            <RequireAuth>
              <RequireRole role="cashier">
                <CashierDashboard />
              </RequireRole>
            </RequireAuth>
          }
        >
          {/* Redirect cashier to Perform Purchase by default */}
          <Route index element={<Navigate to="perform-purchase" replace />} /> 
          <Route path="view-stock" element={<ViewStock />} />
          <Route path="perform-purchase" element={<PerformPurchase />} />
          <Route path="print-bill" element={<PrintBill />} /> {/* Add route for PrintBill */}
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
