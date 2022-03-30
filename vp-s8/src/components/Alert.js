import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import {
    IconButton,
    Menu,
    ListItem,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

function Alert() {
    const [events, setEvents] = useState([{ name: "null", id: "null" }]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
        onSnapshot(collection(db, "events"), (snapshot) =>
        setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    )
    }, [])

    return (
        <div>
            <IconButton
                size="large"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="success"
            >
                <NotificationsIcon />
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
                {events.map(event => (
                    <ListItem>New event:<h1 className='alertitle'>{event.eventTitle}</h1></ListItem>
                ))}
            </Menu>
        </div>
    )
}

export default Alert