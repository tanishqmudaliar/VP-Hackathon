import React, { useState, useEffect } from 'react';
import '../styles/Events.css';
import '../styles/DetailedEvent.css';
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
import { onSnapshot, collection, doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

function Events() {
  const { user } = useUserAuth();
  const [events, setEvents] = useState([{ name: "null", id: "null" }]);
  const [displayName, setDisplayName] = useState('null');
  const [email, setEmail] = useState('null');
  const [number, setNumber] = useState('null');
  const [dob, setDob] = useState('null');
  const [rollno, setRollno] = useState('null');
  const [department, setDepartment] = useState('null');
  const [bio, setBio] = useState('null');
  const [role, setRole] = useState('');
  const [profile, setProfile] = useState('null');
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
      setDisplayName(doc.data().displayName)
      setEmail(doc.data().email)
      setNumber(doc.data().number)
      setRollno(doc.data().rollno)
      setDob(doc.data().dob)
      setNumber(doc.data().number)
      setDepartment(doc.data().department)
      setBio(doc.data().bio)
    })
    getDownloadURL(profileRef)
    .then((url) => {
        setProfile(url)
    })
  });
  }, []);

  const registerEvent = async (e) => {
    e.preventDefault();
    const usersCollRef = doc(db, `events/${user.uid}`)
    updateDoc(usersCollRef, {displayName, number, dob, rollno, department, participatedAt: new Date()})
        .then(
            console.log("Success")
        )
        .catch(error => {
            console.log(error.message)
        })
  }

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
              Events Participated: 3
              </CardContent>
              <CardContent sx={{ height: 'min-content' }}>
              Upcomming Events: 4
              </CardContent>
              <CardContent sx={{ height: 'min-content' }}>
              Events Completed: 0
              </CardContent>
            </Card>
            {role === 'admin' && <Button href="/events/create-edit-events" variant='contained' color="success" sx={{ m: 1, mt: 0, width: '96%' }}>Create/Edit Events</Button>}
          </div>
          <div className='ep2'>
          {events.map((event) => (
            <div key={event.id}>
            <Card sx={{ m: 1, display: 'flex', height: '210px' }}>
            <CardMedia
              component="img"
              sx={{ width: '300px' }}
              image={event.eventThumbnailURL}
              alt="Live from space album cover"
            />
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'left', mt: -1 }}>
            <div className='etitle'>
              <CardContent className="event_title" sx={{ fontSize: '40px', height: '40px', p: 0 }} >
                <Link href={"/events/"+event.id} underline='hover' sx={{ height: '40px', width: 'fit-content', color: 'black', cursor: 'pointer', display: 'flex' }}>{event.eventTitle}</Link> 
              </CardContent>
              {role === 'user' && 
                <form onSubmit={sendEmail}>
                <input readOnly className='sendemail' value={displayName} type="text" name="displayName"/>
                <input readOnly className='sendemail' value={email} type="text" name="user_email"/>
                <textarea readOnly className='sendemail' value={displayName} text="text" name="message"></textarea>
                {user && <Button type='submit' color="success" variant='contained'>Register</Button>}
                </form>
              }
              {!user && <Button onClick={handleLogin} color="success" variant='contained' >Register</Button>}
              </div>
              <div className='eventDesc'>
              <h1 onChange={handleChange('password')}>{values.showPassword ? event.eventDesc : event.eventBrief }</h1>
              </div>
              <div className='efooter'>
                <CardContent className='event_footer' sx={{ p: 0, pt: 1 , fontStyle: 'italic', width: 'fit-content' }}>
                  From {event.eventTimeStart} to {event.eventTimeEnd}
                  <Link underline='none' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} sx={{ color: 'green' ,ml: 1, cursor: 'pointer' }}>{values.showPassword ? "Less Details" : "More Details" }</Link>
                </CardContent>
              </div>
              <CardContent sx={{ p: 0, fontStyle: 'italic', width: '570px', fontSize: '12px' }}>Event ID: {event.id}</CardContent>
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