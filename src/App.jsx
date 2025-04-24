// src/App.jsx
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import NavBar  from "./component/navbar/NavBar";
import Footer  from "./component/nav_footer/Footer";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      {/* Every child route will render here and has access to [isLoggedIn,setIsLoggedIn] */}
      <Outlet context={[isLoggedIn, setIsLoggedIn]} />
      <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </>
  );
}
