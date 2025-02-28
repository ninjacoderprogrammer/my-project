import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Contact from "./routes/Contact.jsx";
import Login from "./routes/Login.jsx";
import SignUp from "./routes/SignUp.jsx";
import Home from "./routes/Home.jsx"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import Dashboard from "./routes/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> }, // Default route
      { path: "contact", element: <Contact /> },
      { 
        path: "login", 
        element: <Login /> 
      },
      { path: "signup", element: <SignUp /> },
      { path: "home", element: <Home /> },
      { 
        path: "dashboard", 
        element: <ProtectedRoute><Dashboard /></ProtectedRoute> 
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);