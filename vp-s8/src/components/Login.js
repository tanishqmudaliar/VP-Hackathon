import React from 'react';
import Form from 'react-bootstrap/Form';
import '../styles/Login.css';
import logo from '../assets/vp-logo.png';
import { Button, TextField } from '@mui/material';

function Login() {
  return (
    <div className='login'>
        <Form className='lgform'>
            <img src={logo} alt="logo" className='logo'/>
            <h1>Login</h1>
            <div>
                <TextField required color='success' id="user-email" label="Email" variant="outlined" sx={{ width: '90%', my: 2 }}/>
                <TextField required color='success' id="user-password" label="Password" variant="outlined" sx={{ width: '90%', mb: 2 }}/>
                <Button color='success' variant='contained' sx={{ width: '90%' }}>Submit</Button>
            </div>
        </Form>
    </div>
  )
}

export default Login