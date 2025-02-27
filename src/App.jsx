import { Outlet } from "react-router-dom";
import NavBar from "./component/navbar/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Outlet />  {/* This will load route content dynamically */}
    </div>
  );
}

export default App;