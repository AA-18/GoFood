import './App.css';
import Home from './components/screens/Home';
import Login from './components/screens/Login';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './components/screens/Signup';
import MyOrder from './components/screens/MyOrder';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/createuser" element={<Signup/>} />
        <Route exact path="/myorders" element={<MyOrder/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
