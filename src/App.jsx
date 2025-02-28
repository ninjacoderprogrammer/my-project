import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavBar from "./component/navbar/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet context={[isLoggedIn, setIsLoggedIn]} />
    </div>
  );
}

export default App;