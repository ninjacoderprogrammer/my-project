import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Contact from "./routes/Contact.jsx";
import Login from "./routes/Login.jsx";
import SignUp from "./routes/SignUp.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);