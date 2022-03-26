import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import logo from '../assets/vp-logo.png'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";
import '../styles/AppBar.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemIcon, ListItemText } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CollectionsIcon from '@mui/icons-material/Collections';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase.js';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Appbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
  }, [])

  function getUsers() {
    const usersCollectionRef = collection(db, 'users')
    getDocs(usersCollectionRef)
      .then(response => {
        const userr = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        })) 
        setUsers(userr)
      })
      .catch(error => console.log(error.message))
  }

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateProfile = () => {
      navigate("/profile")
  }

  return (
    <div>
    {users.map(users => (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open} sx={{ backgroundColor: 'white' }}>
            <Toolbar>
                <Button
                    size="large"
                    edge="start"
                    color="success"
                    aria-label="menu"
                    sx={{ mr: 2, height: '50px', width: 110 }}
                    onClick={handleDrawerOpen}
                >
                <img src={logo} className="logo_mainpage" alt="logo"/>
                </Button>
                <Box className='appbar-title' sx={{ flexGrow: 1 }}>
                    <h1 className='appbar-title-display'>Vidyalankar Polytechnic</h1>
                </Box>
                <IconButton onClick={handleMenu}>
                    <AccountCircleIcon sx={{ fontSize: 40 }}/>
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                  <MenuItem onClick={navigateProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem button>
                <ListItemIcon>
                    <EmojiEventsIcon/>
                </ListItemIcon>
                <ListItemText>
                    Events
                </ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <CloudDownloadIcon />
                </ListItemIcon>
                <ListItemText>
                    Certificates
                </ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <CollectionsIcon />
                </ListItemIcon>
                <ListItemText>
                    Gallery
                </ListItemText>
            </ListItem>
        </List>
      </Drawer>
    </Box>
    ))}
    </div>
  );
}