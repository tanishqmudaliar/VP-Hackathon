import React,{ useState, useEffect } from 'react';
import '../styles/Profile.css';
import Header from './Header.js';
import { useUserAuth } from "../context/UserAuthContext";
import {
    Divider,
    Box,
    IconButton,
    styled,
    TextField,
    Stack,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Select,
    Snackbar,
    Alert,
    Avatar,
    LinearProgress,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Form } from 'react-bootstrap';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, auth, storage } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import Footer from './Footer';

const Input = styled('input')({
    display: 'none',
  });

function Profile() {
    const { user } = useUserAuth();
    const [userID, setUserID] = useState('null');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [dob, setDob] = useState('');
    const [rollno, setRollno] = useState('');
    const [department, setDepartment] = useState(' ');
    const [bio, setBio] = useState('');
    const [open, setOpen] = React.useState(false);
    const [profile, setProfile] = useState('null');
    const [progress, setProgress] = useState(0);

    const formHandler = (e) => {
      e.preventDefault();
      const file = e.target[0].files[0];
      uploadFiles(file);
    };
  
    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `profile/${userID}.png`);
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

    useEffect(() => {
      onAuthStateChanged(auth, (currentuser) => {
        const docRef = doc(db, `users/${currentuser.uid}`)
        const profileRef = ref(storage, `profile/${currentuser.uid}.png`)
        onSnapshot(docRef, (doc) => {
            setUserID(doc.id)
            setDisplayName(doc.data().displayName)
            setEmail(doc.data().email)
            setNumber(doc.data().number)
            setRollno(doc.data().rollno)
            setDob(doc.data().dob)
            setNumber(doc.data().number)
            setDepartment(doc.data().department)
            setBio(doc.data().bio)
        })
        getDownloadURL(profileRef)
            .then((url) => {
                setProfile(url)
        })
      });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usersCollRef = doc(db, `users/${user.uid}`)
        updateDoc(usersCollRef, {displayName, number, dob, rollno, department, bio, updatedAt: new Date()})
            .then(
                setOpen(true)
            )
            .catch(error => {
                console.log(error.message)
            })
    }

    const handleClose = (reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    return (
        <div>
            <Header />
            <div className='profile'>
                <div className='section1'>
                    <Avatar className="avatar" alt={displayName} src={profile} sx={{ width: '30vw', height: '30vw', borderRadius: '10px', mb: 3 }}/>
                    <Divider sx={{ my: 1 }}/>
                    <Box sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
                        <h1 className='sectionh1'>Change Profile Photo</h1>
                        <Form onSubmit={formHandler} sx={{ display: 'flex' }}>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file"/>
                                <IconButton color="success" aria-label="upload-picture" component="span" sx={{ ml: 1 }}>
                                    <PhotoCamera sx={{ fontSize: 30 }}/>
                                </IconButton>
                            </label>
                            <Button type='submit' variant='contained' color='success' sx={{ ml: 2 }}>Upload</Button>
                        </Form>
                        {progress > 0 && <LinearProgress value={progress} variant="determinate" color="success" sx={{ width: '30vw', mt: 1 }} />}
                    </Box>
                </div>
                <div className='section2'>
                    <h1>Account Details</h1>
                    <Form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            variant="outlined"
                            color='success'
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            variant="outlined"
                            color='success'
                            type="email"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={email}
                        />
                        <Box>
                            <TextField
                                type="number"
                                id="number"
                                label="Number"
                                variant="outlined"
                                color='success'
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                sx={{ width: '49%', mr: '2%' }}
                            />
                            <TextField
                                id="date"
                                label="Date Of Birth"
                                type="date"
                                color="success"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                sx={{ width: '49%' }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Box>
                        <Box>
                        <TextField
                            fullWidth
                            id="rollno"
                            label="Roll No"
                            variant="outlined"
                            color='success'
                            value={rollno}
                            onChange={(e) => setRollno(e.target.value)}
                            sx={{ width: '49%', mr: '2%' }}
                        />
                        <FormControl sx={{ width: '49%' }}>
                            <InputLabel id="demo-simple-select-label" color='success'>Department</InputLabel>
                            <Select
                                displayEmpty
                                labelId="dpeartment"
                                id="department"
                                label="Department"
                                color='success'
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                >
                                <MenuItem value=" " disabled>Select Department</MenuItem>
                                <MenuItem value="Electronics And Telecommunication">Electronics And Telecommunication</MenuItem>
                                <MenuItem value="Information Technology">Information Technology</MenuItem>
                                <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                        <TextField
                            id="outlined-textarea"
                            label="Biography"
                            rows={6.9}
                            color="success"
                            multiline
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <Button variant="contained" type="submit" color='success'>Submit</Button>
                    </Stack>
                    </Form>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Account Successfully Updated! Please wait for a few seconds before reloading the site
                        </Alert>
                    </Snackbar>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile