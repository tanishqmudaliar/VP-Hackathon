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
} from '@mui/material';
import { db, auth, storage } from '../config/firebase';
import { onSnapshot, collection, doc } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

function Events() {
  const [events, setEvents] = useState([{ name: "null", id: "null" }]);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [profile, setProfile] = useState('null');

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
            {role === 'admin' && <Button variant='contained' color="success" sx={{ m: 1, mt: 0, width: '96%' }} >Create/Edit Events</Button>}
          </div>
          <div className='ep2'>
          {events.map((event) => (
            <div key={event.id}>
            <Card sx={{ m: 1, display: 'flex', height: 'fit-content' }}>
            <CardMedia
              component="img"
              sx={{ width: '300px' }}
              image={event.eventThumbnailURL}
              alt="Live from space album cover"
            />
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'left', mt: -1 }}>
              <CardContent className="event_title" sx={{ fontSize: '40px', height: '40px', p: 0 }} >
                {event.eventTitle}
              </CardContent>
              <CardContent className="event_description" sx={{ fontSize: '20px', height: 'fit-content', p: 0, pt: 2, width: '570px' }}>
                {event.eventDesc}
              </CardContent>
              <CardContent className='event_footer' sx={{ p: 0, pt: 1 , height: 'fir-content', fontStyle: 'italic', width: '570px' }}>
                From {event.eventTimeStart} to {event.eventTimeEnd}
              </CardContent>
            {role === 'admin' && <CardContent sx={{ p: 0, height: 'fit-content', fontStyle: 'italic', width: '570px', fontSize: '12px' }}>Event ID: {event.id}</CardContent>}
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

export default Events