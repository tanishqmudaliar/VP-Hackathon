import React, { useState, useEffect } from 'react';
import '../styles/Events.css';
import Header from './Header';
import Footer from './Footer';
import { 
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import image from '../assets/image5.png';
import { db } from '../config/firebase';
import { onSnapshot, collection } from "firebase/firestore";

function Events() {
  const [events, setEvents] = useState([{ name: "null", id: "null" }]);

  useEffect(() => {
    onSnapshot(collection(db, "events"), (snapshot) =>
    setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  )
  }, [])

  return (
    <div>
        <Header />
        <div className='events'>
          <div className='ep1'>
            Hi
          </div>
          <div className='ep2'>
          {events.map((event) => (
            <div key={event.id}>
            <Card sx={{ m: 1, display: 'flex', height: 'fit-content' }}>
            <CardMedia
              component="img"
              sx={{ width: '300px' }}
              image={image}
              alt="Live from space album cover"
            />
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'left', mt: -1 }}>
              <CardContent className="event_title" sx={{ fontSize: '40px', height: '40px', p: 0 }} >
                {event.eventTitle}
              </CardContent>
              <CardContent className="event_description" sx={{ fontSize: '20px', height: 'fit-content', p: 0, pt: 2, width: '570px' }}>
                {event.eventDesc}
              </CardContent>
              <CardContent className='event_footer' sx={{ p: 0, pt: 1 , height: '1px', fontStyle: 'italic', width: '570px' }}>
                {event.eventFooter}
              </CardContent>
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