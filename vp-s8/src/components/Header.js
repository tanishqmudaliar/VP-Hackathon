import React from 'react';
import AppBar from '@mui/material/AppBar';
import logo from '../assets/vp-logo.png';
import '../styles/Header.css'
import { Button, Box, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <div className='Header'>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Button
            size="large"
            edge="start"
            color="success"
            aria-label="menu"
            sx={{ mr: 2, height: '50px', width: 110 }}
          >
            <img src={logo} className="logo" alt="logo"/>
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button variant="contained" color="success" href="/login">Login</Button>
          <Button variant="text" sx={{ ml: 1, color: 'green' }} color="success" href="/signup">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Header