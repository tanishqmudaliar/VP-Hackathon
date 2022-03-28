import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import Events from './components/Events';
import Images from './components/Images';
import Videos from './components/Videos';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/home' element={<HomePage />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/events' element={<Events />} />
          <Route exact path='/images' element={<Images />} />
          <Route exact path='/videos' element={<Videos />} />
          <Route exact path='/contactus' element={<ContactUs />} />
          <Route exact path='/404' element={<PageNotFound />}/>
          <Route path="*" element={<Navigate to="/404"/>} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
