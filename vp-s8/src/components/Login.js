import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../assets/vp-logo.png';
import { useUserAuth } from "../context/UserAuthContext.js";
import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { Button, TextField, Link, Alert, IconButton, Collapse, InputAdornment } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LockResetIcon from '@mui/icons-material/LockReset';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { logIn, forgotPassword } = useUserAuth();
  const [open, setOpen] = useState(true);
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

  const sendforgotPasswordLink = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await forgotPassword(email);
      setSuccess("Password reset link sent successfully");
    } catch (err) {
      setError(err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='login'>
        <Form className='lgform' onSubmit={handleSubmit}>
          <div className='lgalert'>
          <Collapse in={open}>{error && <Alert severity='error' sx={{ width: { lg: '55vw', md: '52vw' }, mb: 1 }} action={<IconButton aria-label='close' color='inherit' size='small' onClick={() => {setOpen(false);}}><CloseIcon fontSize='inherit'/></IconButton>}>{error}</Alert>}</Collapse>
          {success && <Alert severity='success' sx={{ width: { lg: '55vw', md: '52vw' } }}>{success}</Alert>}
          </div>
            <img src={logo} alt="logo" className='logo-login'/>
            <h1>Login</h1>
            <div className='lgform1'>
                <TextField
                  required
                  type="email"
                  color='success'
                  id="user-email"
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ width: '90%', my: 2 }}
                />
                <TextField
                  required
                  type={values.showPassword ? 'text' : 'password'}
                  color='success'
                  id="user-password"
                  label="Password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ width: '90%', mb: 2 }}
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
                <Button type='submit' color='success' variant='contained' sx={{ width: '90%', mb: 1 }} onClick={() => {setOpen(true);}} startIcon={<LoginIcon />}>Submit</Button>
                <Button color='success' variant='contained' onClick={sendforgotPasswordLink} sx={{ width: '90%' }} startIcon={<LockResetIcon />}>Forgot Password</Button>
                <div className='lgfooter'>
                  Don't have an account?<Link href="/signup" underline="hover" sx={{ color: 'green', ml: 1 }}>Sign Up</Link>
                </div>
            </div>
        </Form>
    </div>
  )
}

export default Login