import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import App from "./App.jsx";
import Home from "./routes/Home.jsx";
import Contact from "./routes/Contact.jsx";
import Login from "./routes/Login.jsx";
import SignUp from "./routes/SignUp.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Overview from "./routes/overview.jsx";
import AddCashier from "./routes/addCashier.jsx";
import AddProduct from "./routes/addProduct.jsx";
import ViewCashiers from "./routes/viewCashiers.jsx";
// …import other dashboard pages here

const token = localStorage.getItem("authToken");
const isAuthenticated = Boolean(token);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },

      // Protected dashboard
      {
        path: "dashboard",
        element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
        children: [
          {
            element: <Dashboard />,  // renders sidebar + <Outlet/>
            children: [
              { index: true, element: <Overview /> },
              { path: "overview", element: <Overview /> },
              { path: "add-cashier", element: <AddCashier /> },
              { path: "add-product", element: <AddProduct /> },
              { path: "view-cashiers", element: <ViewCashiers /> },
              // …add more child routes like transactions, sales-by-product, etc.
              { path: "*", element: <Navigate to="overview" replace /> }
            ]
          }
        ]
      },

      // catch-all: redirect unknown to home (or login)
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
