import logo from './logo.svg';
import { 
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css'
import Profile from './components/Profile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
