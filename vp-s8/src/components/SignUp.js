import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../styles/SignUp.css';
import logo from '../assets/vp-logo.png';
import { Button, TextField, Link, Alert } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useUserAuth } from "../context/UserAuthContext.js";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='signup'>
        <Form className='spform' onSubmit={handleSubmit}>
          {error && <Alert severity='error' sx={{ width: '90%', ml: '2.5%' }}>{error}</Alert>}
            <img src={logo} alt="logo" className='logo-login'/>
            <h1>Create an account</h1>
            <div className='spform1'>
                <TextField required color='success' id="user-email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} sx={{ width: '90%', my: 2 }}/>
                <TextField required color='success' id="user-password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} sx={{ width: '90%', mb: 2 }}/>
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