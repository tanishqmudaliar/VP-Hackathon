import React,{ useEffect, useState } from 'react';
import './Ap.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { db, auth } from './config/firebase';
import { onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import Events from './components/Events';
import Images from './components/Images';
import Videos from './components/Videos';
import ContactUs from './components/ContactUs';
import CreateEditEvents from './components/CreateEditEvents';
import DetailedEvent from './components/DetailedEvent';

function App() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      const docRef = doc(db, `users/${currentuser.uid}`)
      onSnapshot(docRef, (doc) => {
          setEmail(doc.data().email)
      })
    });
  }, []);

  return (
    <div className="App">
      <div className='pc_view'>
        <UserAuthContextProvider>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/home' element={<HomePage />} />
            <Route exact path={'/profile/:id'+email} element={<Profile />} />
            <Route exact path='/events' element={<Events />} />
            <Route exact path='/events/create-edit-events' element={<CreateEditEvents />} />
            <Route exact path='/gallery/images' element={<Images />} />
            <Route exact path='/gallery/videos' element={<Videos />} />
            <Route exact path='/contactus' element={<ContactUs />} />
            <Route path={'/events/:id'} element={<DetailedEvent />}/>
            <Route exact path="/404" element={<PageNotFound />} />
            <Route exact path="*" element={<Navigate to="/404" />} />
          </Routes>
        </UserAuthContextProvider>
      </div>
      <div className='mobile_view'>
        <h1>Comming Soon</h1>
        This is website is not yet developed for mobile view!
      </div>
    </div>
  );
}

export default App;
