import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import {
  Avatar,
  IconButton,
  ListItem,
  Menu,
  MenuItem,
} from '@mui/material';
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth,storage } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, getDownloadURL} from 'firebase/storage';

function AccountPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      const docRef = doc(db, `users/${currentuser.uid}`)
      const profileRef = ref(storage, `profile/${currentuser.uid}.png`)
      onSnapshot(docRef, (doc) => {
        setDisplayName(doc.data().displayName)
        setEmail(doc.data().email)
      })
      getDownloadURL(profileRef)
        .then((url) => {
          setProfile(url)
      });
    });
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  const navigateProfile = () => {
    navigate('/profile/'+email)
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div>
          <IconButton color='success' sx={{ width: 50, height: 50 }} onClick={handleClick}>
              <Avatar alt={displayName} src={profile}/>
          </IconButton>
          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
              'aria-labelledby': 'basic-button',
              }}
          >
            <ListItem sx={{ color: 'black' }}>{displayName}</ListItem>
            <MenuItem sx={{  '&:hover' : { color: 'green' } }} onClick={navigateProfile}>My account</MenuItem>
            <MenuItem sx={{ '&:hover' : { color: 'green' } }} onClick={handleLogout}>Logout</MenuItem>
          </Menu>
      </div>
  )
}

export default AccountPopover