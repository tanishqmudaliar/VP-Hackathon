import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/home' element={<HomePage />} />
          <Route exact path='/profile' element={<Profile />}/>
          <Route exact path='/events'/>
          <Route exact path='/gallery' />
          <Route exact path='/404' />
          <Route path="*" element={<Navigate to="/404"/>} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
