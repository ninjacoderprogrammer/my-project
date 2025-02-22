
import './App.css';
import Greetings from './component/greeting/Greetings';
import LoginProfile from './component/loginToProfile/LoginProfile';
function App() {
  console.log("rgr")
  const hobbies = ["Coding", "Reading", "Gaming", "Music"];
  return (
    <div>
      <Greetings name="sawan" message="hello" hobbies={hobbies}/>
      <LoginProfile />
    </div>
  );
}

export default App;
