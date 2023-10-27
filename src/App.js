import './App.css';
import Home from './pages/home/home.js'
import Login from './components/login/login';
import Register from './components/Register/Register';
import Profile from './pages/MyProfile/Profile';
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import { useContext } from 'react';
import { Authcontext } from './context/Authcontext';

function App() {
  const {user} = useContext(Authcontext)
  // console.log(user);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Register/>} />
          <Route path='/login' element={user ? <Navigate to='/'/> :<Login />} />
          <Route path='/register' element={user ? <Navigate to='/'/> : <Register />} />
          <Route path='/profile/:username' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
} 

export default App;
