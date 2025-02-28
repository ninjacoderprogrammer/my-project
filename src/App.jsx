import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavBar from "./component/navbar/NavBar";
import Footer from "./component/Nav_Footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet context={[isLoggedIn, setIsLoggedIn]} />
      <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default App;