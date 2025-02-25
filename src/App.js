import './App.css';
import Login from './component/Login/Login.jsx';
import NavBar from './component/navbar/NavBar.jsx';
import Footer from './component/navbar_footer/Footer.jsx';

function App() {
  console.log("rgr")
  return (
    <div>
      <NavBar />
      <Login />
      <Footer />
    </div>
  );
}

export default App;