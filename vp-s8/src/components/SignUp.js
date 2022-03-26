import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../styles/SignUp.css';
import logo from '../assets/vp-logo.png';
import { Button, TextField, Link, Alert, InputAdornment, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useUserAuth } from "../context/UserAuthContext.js";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.js';

function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (
        displayName === '' | password === '' | email === '' | number === '') {
        return
      }
      signUp(email, password)
        .then(data => {
          const usersCollRef = doc(db, `users/${data.user.uid}`)
          setDoc(usersCollRef, {displayName, email, number, createdAt: new Date()})
            .then(response => {
              console.log(response)
            })
            .catch(error => {
              console.log(error.message)
            })
          })
      } catch (err) {
        setError(err.message);
      }
      navigate("/home");
  };

  return (
    <div className='signup'>
        <Form className='spform' onSubmit={handleSubmit}>
          {error && <Alert severity='error' sx={{ width: '90%', ml: '2.5%' }}>{error}</Alert>}
            <img src={logo} alt="logo" className='logo-login'/>
            <h1>Create an account</h1>
            <div className='spform1'>
              <TextField required type="text" color='success' id="name" label="Name" variant="outlined" onChange={(e) => setDisplayName(e.target.value)} sx={{ width: '90%', my: 2 }}/>
              <TextField required type="number" color='success' id="number" label="Number" variant="outlined" onChange={(e) => setNumber(e.target.value)} sx={{ width: '90%', mb: 2 }} InputProps={{
                startAdornment: 
                <InputAdornment position="start">
                  <Typography sx={{ mx: -2 }}>
                    +91
                  </Typography>
                </InputAdornment>}}/>
              <TextField required type="email" color='success' id="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} sx={{ width: '90%', mb: 2 }} />
              <TextField required type="password" color='success' id="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} sx={{ width: '90%', mb: 2 }}/>
              <Button type='submit' color='success' variant='contained' sx={{ width: '90%', mb: 1 }} startIcon={<LoginIcon />}>Submit</Button>
              <div className='spfooter'>
                Already have an account?<Link href="/login" underline="hover" sx={{ color: 'green', ml: 1 }}>Login</Link>
              </div>
            </div>
        </Form>
    </div>
  )
}

export default SignUp