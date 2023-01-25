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
  Menu,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import emailjs from 'emailjs-com';
import { db, auth, storage } from '../config/firebase';
import { onSnapshot, collection, doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import Participants from './Participants';

function Events() {
  const { user } = useUserAuth();
  const [events, setEvents] = useState([{ name: "null", id: "null" }]);
  const [eventID, setEventID] = useState('');
  const [userID, setUserID] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [dob, setDob] = useState('');
  const [rollno, setRollno] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [profile, setProfile] = useState('');
  const [values, setValues] = useState({
    desc: '',
    showDesc: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [snackbar, setSnackbar] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showDesc: !values.showDesc,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function sendEmail(e) {
    e.preventDefault()

    emailjs.sendForm('vidyalankar_vp9', 'registered_vp9', e.target, 'lRRWXKzeM_Bk6-g3j')
    const participatedCollRef = doc(db, `events/${eventID}/participated/${email}`)
    setDoc(participatedCollRef, {userID, profile, displayName, number, dob, rollno, department, participatedAt: new Date()})
      .then(() => {
          setSnackbar(true)
      }, (error) => {
          console.log(error);
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
      setUserID(doc.id)
      setRole(doc.data().role)
      setDisplayName(doc.data().displayName)
      setEmail(doc.data().email)
      setNumber(doc.data().number)
      setRollno(doc.data().rollno)
      setDob(doc.data().dob)
      setNumber(doc.data().number)
      setDepartment(doc.data().department)
    })
    getDownloadURL(profileRef)
    .then((url) => {
        setProfile(url)
    })
  });
  }, []);

  const handleCloseSnackBar = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };

  return (
    <div>
        <Header />
        <div className='events'>
          <div className='ep1'>
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
            {role === 'admin' && <Button href="/events/create-edit-events" variant='contained' color="success" sx={{ mx: 1, width: '96%' }}>Create/Edit Events</Button>}
            {role === 'admin' && <Participants />}
          </div>
          <div className='ep2'>
          {events.map((event) => (
            <div key={event.id}>
            <Card sx={{ m: 1, display: 'flex', height: '210px' }}>
            <CardMedia
              component="img"
              sx={{ width: '300px' }}
              image={event.eventThumbnailURL}
              alt={displayName}
            />
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'left', mt: -1 }}>
            <div className='etitle'>
              <CardContent className="event_title" sx={{ fontSize: '40px', height: '40px', p: 0 }} >
                {event.eventTitle}
              </CardContent>
              {role === 'user' && <div>
                <Button
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  color="success"
                  variant='contained'>
                    Register
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <form className='registerform' onSubmit={sendEmail}>
                      <input readOnly className='sendemail' value={displayName} type="text" name="displayName"/>
                      <input readOnly className='sendemail' value={email} type="text" name="user_email"/>
                      <TextField required onChange={(e) => setEventID(e.target.value)} label='Event ID' color='success' variant='outlined' sx={{ mx: 1 }}/>
                      <Button type='submit' color='success' variant='contained' sx={{ mx: 1, mt: 1 }} >Register</Button>
                    </form>
                  </Menu>
                </div>
              }
              {!user && <Button onClick={handleLogin} color="success" variant='contained' >Register</Button>}
              </div>
              <div className='eventDesc'>
              <h1 onChange={handleChange('desc')}>{values.showDesc ? event.eventDesc : event.eventBrief }</h1>
              </div>
              <div className='efooter'>
                <CardContent className='event_footer' sx={{ p: 0, pt: 1 , fontStyle: 'italic', width: 'fit-content' }}>
                  From {event.eventTimeStart} to {event.eventTimeEnd}
                  <Link underline='none' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} sx={{ color: 'green' ,ml: 1, cursor: 'pointer' }}>{values.showDesc ? "Less Details" : "More Details" }</Link>
                </CardContent>
              </div>
              <CardContent sx={{ p: 0, fontStyle: 'italic', width: '570px', fontSize: '12px' }}>Event ID: {event.id}</CardContent>
            </CardContent>
            </Card>
            </div>
          ))}
          </div>
          <Snackbar open={snackbar} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
              Registeration successful!
            </Alert>
          </Snackbar>
        </div>
        <Footer />
    </div>
  )
}

export default Events;