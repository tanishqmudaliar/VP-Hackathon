import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Alert,
    styled,
    IconButton,
    LinearProgress,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Form } from 'react-bootstrap';
import '../styles/CreateEditEvents.css';
import Footer from './Footer';
import Header from './Header';
import { db, storage } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Input = styled('input')({
    display: 'none',
  });

function CreateEditEvents() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [eventID, setEventID] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventTimeStart, setEventTimeStart] = useState('');
    const [eventTimeEnd, setEventTimeEnd] = useState('');
    const [eventThumbnailURL, setEventThumbnailURL] = useState('');
    const [progress, setProgress] = useState(0);

    const formHandler = (e) => {
        e.preventDefault();
        if ( eventID === '' ) return setError("It takes some time to sync with firebase please wait for a few seconds and alos check if you have filled each and every field");
        const file = e.target[0].files[0];
        uploadFiles(file);
      };
    
      const uploadFiles = (file) => {
            if (!file) return;
            const storageRef = ref(storage, `event/${eventID}.png`);
            const uploadTask = uploadBytesResumable(storageRef, file)
    
            uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => console.log(error),
      )};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const storageRef = ref(storage, `event/${eventID}.png`);
        getDownloadURL(storageRef)
            .then((url) => {
                setEventThumbnailURL(url)
        })
        try {
            if (
                eventID === '' | eventTitle === '' | eventDesc === '' | eventTimeStart === '' | eventTimeEnd === '' | eventThumbnailURL === '' ) {
                return setError("It takes some time to upload the image and sync with firebase so please wait for a few seconds before tring again & also check whether you have filled the form completely")
            }
            const eventCollRef = doc(db, `events/${eventID}`)
            ref(storage, `events/${eventID}.png`)
            setDoc(eventCollRef, {eventTitle, eventDesc, eventTimeStart, eventTimeEnd, eventThumbnailURL})
            setSuccess("Event successfully created/edited")
          } catch (err) {
            setError(err.message)
            console.log(error)
          }
      };

    return (
        <div>
            <Header />
            <div className='ceevents'>
                <div className='cee1'>
                    <h1>Create / Edit Events</h1>
                    <Form onSubmit={handleSubmit} className='cform'>
                        <TextField onChange={(e) => setEventID(e.target.value)} required color='success' label="Event ID" variant='outlined' sx={{ mb: 1 }}/>
                        <TextField onChange={(e) => setEventTitle(e.target.value)} required color='success' label="Event Title" variant='outlined' sx={{ mb: 1 }}/>
                        <TextField onChange={(e) => setEventDesc(e.target.value)} required color='success' label="Event Description" variant='outlined' sx={{ mb: 1 }} multiline/>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <TextField
                                onChange={(e) => setEventTimeStart(e.target.value)}
                                required
                                color='success'
                                label="Event Start Time"
                                type="datetime-local"
                                sx={{ width: '49%' }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <TextField
                                onChange={(e) => setEventTimeEnd(e.target.value)}
                                required
                                color='success'
                                label="Event End Time"
                                type="datetime-local"
                                sx={{ width: '49%' }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Box>
                        <Button type='submit' color='success' variant='contained' sx={{ my: 1 }}>Submit</Button>
                    </Form>
                    <Form onSubmit={formHandler} sx={{ display: 'flex', mx: 2 }}>
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file"/>
                            <IconButton color="success" aria-label="upload-picture" component="span" sx={{ width: '3%', mt: -2 }}>
                                <PhotoCamera sx={{ fontSize: 30 }}/>
                            </IconButton>
                        </label>
                        <Button type='submit' variant='contained' color='success' sx={{ ml: 2, mb: 1, width: '94%' }}>Upload</Button>
                        {progress > 0 && <LinearProgress value={progress} variant="determinate" color="success" sx={{ mx: 2, mb: 1 }} />}
                    </Form>
                    {error && <Alert severity='error' sx={{ mb: 2, mx: 2 }}>{error}</Alert>}
                    {success && <Alert severity='success' sx={{ mb: 2, mx: 2 }}>{success}</Alert>}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CreateEditEvents