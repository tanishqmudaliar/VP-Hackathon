import React, { useState } from 'react';
import '../styles/SignUp.css';
import logo from '../assets/vp-logo.png';
import { useUserAuth } from "../context/UserAuthContext.js";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { Form } from 'react-bootstrap';
import { Button, TextField, Link, Alert, InputAdornment, Typography, FormControlLabel, Radio, RadioGroup, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const [values, setValues] = useState({
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    setRole(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (
        displayName === '' | password === '' | email === '' | number === '' | role === '') {
        return setError("Please fill every field!")
      }
      signUp(email, password)
        .then(data => {
          const usersCollRef = doc(db, `users/${data.user.uid}`)
          setDoc(usersCollRef, {displayName, email, number, role, createdAt: new Date()})
            .then(
              console.log('account creation successfull')
            )
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
              <TextField
                required
                type="text"
                color='success'
                id="name"
                label="Name"
                variant="outlined"
                onChange={(e) => setDisplayName(e.target.value)}
                sx={{ width: '90%', my: 2 }}
              />
              <TextField
                required
                type="number"
                color='success'
                id="number"
                label="Number"
                variant="outlined"
                onChange={(e) => setNumber(e.target.value)}
                sx={{ width: '90%', mb: 2 }}
                InputProps={{
                  startAdornment: 
                  <InputAdornment position="start">
                    <Typography sx={{ mx: -2 }}>
                      +91
                    </Typography>
                  </InputAdornment>
                }}
              />
              <TextField
                required
                type="email"
                color='success'
                id="email"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: '90%', mb: 2 }}
              />
              <TextField
                required
                type={values.showPassword ? 'text' : 'password'}
                color='success'
                id="password"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: '90%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <RadioGroup
                row
              >
                <FormControlLabel onChange={handleChange} value="admin" control={<Radio color='success'/>} label="Admin" />
                <FormControlLabel onChange={handleChange} value="user" control={<Radio color='success'/>} label="User" />
              </RadioGroup>
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