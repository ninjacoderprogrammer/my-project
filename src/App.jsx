import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import './styles/theme.css';
// import NavBar from "./component/navbar/NavBar";
import Footer from "./component/nav_footer/Footer";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // const location = useLocation();
  // Hide NavBar on the dashboard route
  // const hideNavBar = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* {!hideNavBar && <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} */}
      {/* Every child route will render here and has access to [isLoggedIn, setIsLoggedIn] */}
      <div className="main-content-area">
        <Outlet context={[isLoggedIn, setIsLoggedIn]} />
      </div>
      <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}