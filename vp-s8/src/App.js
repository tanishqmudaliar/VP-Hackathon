import React,{ useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { db, auth } from './config/firebase';
import { onSnapshot, collection } from "firebase/firestore";
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
  const [events, setEvents] = useState([{ name: "null", id: "null" }]);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    onSnapshot(collection(db, "events"), (snapshot) =>
    setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  )
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      const docRef = doc(db, `users/${currentuser.uid}`)
      onSnapshot(docRef, (doc) => {
          setDisplayName(doc.data().email)
      })
    });
  }, []);

  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/home' element={<HomePage />} />
          <Route exact path={'/profile/:id'+displayName} element={<Profile />} />
          <Route exact path='/events' element={<Events />} />
          <Route exact path='/events/create-edit-events' element={<CreateEditEvents />} />
          <Route exact path='/gallery/images' element={<Images />} />
          <Route exact path='/gallery/videos' element={<Videos />} />
          <Route exact path='/contactus' element={<ContactUs />} />
          {events.map(() => (
            <Route path={'/events/:id'} element={<DetailedEvent />}/>
          ))}
          <Route exact path="/404" element={<PageNotFound />} />
          <Route exact path="*" element={<Navigate to="/404" />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
