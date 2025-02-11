
import './App.css';
import Greetings from './component/greeting/Greetings';

function App() {
  console.log("rgr")
  const hobbies = ["Coding", "Reading", "Gaming", "Music"];
  return (
    <div>

      <Greetings name="sawan" message="hello"  hobbies={hobbies}/>
      
    </div>
  );
}

export default App;
