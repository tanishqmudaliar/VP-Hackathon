import React,{ useState, useEffect } from 'react';
import '../styles/DetailedEvent.css';
import Footer from './Footer';
import Header from './Header';
import { 
    Card,
    CardContent,
    Avatar,
    Box,
} from '@mui/material';
import { db, auth, storage } from '../config/firebase';
import { onSnapshot, collection, doc } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

function DetailedEvent() {
    const [events, setEvents] = useState([{ name: "null", id: "null" }]);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [profile, setProfile] = useState('null');

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
    
    useEffect(() => {
        onSnapshot(collection(db, "events"), (snapshot) =>
        setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )
        }, [])

    return (
        <div>
            <Header />
            <div className='de'>
                <div className='de1'>
                    <Card sx={{ m: 1, display: 'flex', pb: 2, borderBottom: '1px solid black' }}>
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
                </div>
                <div className='de2'>
                    {events.map(event => (
                        <li key={event.id}>
                            {event.eventTitle}
                        </li>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailedEvent