import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Alert, Button, TextField } from '@mui/material';
import emailjs from 'emailjs-com';
import '../styles/ContactUs.css';
import Footer from './Footer';
import Header from './Header';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function ContactUs() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('vidyalankar_vp9', 'contactus_vp9', e.target, 'lRRWXKzeM_Bk6-g3j')
      .then((result) => {
          setSuccess("Email sent successfully!")
      }, (error) => {
          setError(error)
      });
      e.target.reset()
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      const docRef = doc(db, `users/${currentuser.uid}`)
      onSnapshot(docRef, (doc) => {
          setRole(doc.data().role)
          setEmail(doc.data().email)
          setDisplayName(doc.data().displayName)
      })
    });
    }, []);

  return (
    <div className='cu'>
        <Header />
        <div className='contactus'>
          <Form onSubmit={sendEmail} className='cuform'>
            <h1>Contact Us</h1>
            <input readOnly className='sendemail' value={role} type="text" name="role"/>
            <input readOnly className='sendemail' value={displayName} type="text" name="displayName"/>
            <input required readOnly className='sendemail' value={email} type="text" name="user_email"/>
            <TextField required multiline minRows={6} maxRows={10} color='success' type="text" name="message" label="Message" variant="outlined" sx={{ m: 2 }} />
            <Button type="submit" color='success' variant="contained" sx={{ mx: 2, mb: 2 }}>Submit</Button>
            {error && <Alert severity='error' sx={{ mx: 2, mb: 2 }} >{error}</Alert>}
            {success && <Alert severity='success' sx={{ mx: 2, mb: 2 }} >{success}</Alert>}
          </Form>
        </div>
        <Footer />
    </div>
  )
}

export default ContactUs