import React, { useState, useEffect } from 'react';
import '../styles/Events.css';
import Header from './Header';
import Footer from './Footer';
import { 
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Box,
  Button,
  Link,
} from '@mui/material';
import emailjs from 'emailjs-com';
import { db, auth, storage } from '../config/firebase';
import { onSnapshot, collection, doc } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

function Events() {
  const { user } = useUserAuth();
  const [events, setEvents] = useState([{ name: "null", id: "null" }]);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [profile, setProfile] = useState('null');
  const navigate = useNavigate();

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('vidyalankar_vp9', 'template_vp9', e.target, 'lRRWXKzeM_Bk6-g3j')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
}

  const handleLogin = () => {
    navigate('/login')
  }

  useEffect(() => {
    onSnapshot(collection(db, "events"), (snapshot) =>
    setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  )
  }, [])

  useEffect(() => {
  onAuthStateChanged(auth, (currentuser) => {
    const profileRef = ref(storage, `profile/${currentuser.uid}.png`)
    const docRef = doc(db, `users/${currentuser.uid}`)
    onSnapshot(docRef, (doc) => {
        setRole(doc.data().role)
        setEmail(doc.data().email)
        setDisplayName(doc.data().displayName)
    })
    getDownloadURL(profileRef)
    .then((url) => {
        setProfile(url)
    })
  });
  }, []);

  return (
    <div>
        <Header />
        <div className='events'>
          <div className='ep1'>
            <Card sx={{ m: 1, display: 'flex', pb: 2, mb: 0, borderBottom: '1px solid black' }}>
              <Avatar src={profile} alt={displayName}  sx={{ width: '3cm', height: '3cm', ml: '1vw', mt: 4 }}/>
              <Box sx={{ display: 'grid', textAlign: 'left'}}>
                <CardContent sx={{ fontSize: '20px', height: '40px', p: 0, pt: 3, pl: 2, color: 'black' }}>
                  Name: {displayName}
                </CardContent>
                <CardContent sx={{ fontSize: '20px', height: '40px', p: 0, pl: 2, color: 'black' }}>
                  Role: {role}
                </CardContent>
                <CardContent sx={{ fontSize: '20px', height: 'fit-content', p: 0, pl: 2, pb: 1, color: 'black' }}>
                  Email: {email}
                </CardContent>
              </Box>
            </Card>
            <Card sx={{ m: 1, display: 'flex', mt: 0 }}>
              <CardContent sx={{ height: 'min-content' }}>
              Events Participated: 5
              </CardContent>
              <CardContent sx={{ height: 'min-content' }}>
              Upcomming Events: 5
              </CardContent>
              <CardContent sx={{ height: 'min-content' }}>
              Events Completed: 5
              </CardContent>
            </Card>
            {role === 'admin' && <Button href="/events/create-edit-events" variant='contained' color="success" sx={{ m: 1, mt: 0, width: '96%' }}>Create/Edit Events</Button>}
          </div>
          <div className='ep2'>
          {events.map((event) => (
            <div key={event.id}>
            <Card sx={{ m: 1, display: 'flex', height: '200px' }}>
            <CardMedia
              component="img"
              sx={{ width: '300px' }}
              image={event.eventThumbnailURL}
              alt="Live from space album cover"
            />
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'left', mt: -1 }}>
            <div className='etitle'>
              <CardContent className="event_title" sx={{ fontSize: '40px', height: '10px', p: 0 }} >
                {event.eventTitle}
              </CardContent>
              {role === 'user' && 
                <form onSubmit={sendEmail}>
                <input readOnly className='sendemail' value={displayName} type="text" name="displayName"/>
                <input readOnly className='sendemail' value={email} type="text" name="user_email"/>
                <textarea readOnly className='sendemail' value={role} text="text" name="message"></textarea>
                {user && <Button type='submit' color="success" variant='contained' sx={{ mt: 1 }}>Register</Button>}
                {!user && <Button onClick={handleLogin} color="success" variant='contained' sx={{ mt: 1 }}>Register</Button>}
                </form>
              }
              </div>
              <div className='eventDesc'>
              <h1>{event.eventDesc}</h1>
              </div>
              <div className='efooter'>
                <CardContent className='event_footer' sx={{ p: 0, pt: 1 , fontStyle: 'italic', width: 'fit-content' }}>
                  From {event.eventTimeStart} to {event.eventTimeEnd}
                </CardContent>
                <Link href={"/events/"+event.id} underline='hover' sx={{ width: 'fit-content', ml: 1, mt: 0.65, color: 'green', cursor: 'pointer' }}>More Details</Link>
              </div>
              {role === 'admin'  && <CardContent sx={{ p: 0, height: 'fit-content', fontStyle: 'italic', width: '570px', fontSize: '12px' }}>Event ID: {event.id}</CardContent>}
            </CardContent>
            </Card>
            </div>
          ))}
          </div>
        </div>
        <Footer />
    </div>
  )
}
export default Events;