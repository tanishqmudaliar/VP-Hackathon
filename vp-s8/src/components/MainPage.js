import React from 'react';
import Header from './Header';
import '../styles/HomePage.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import CarouselComponent from './CarouselComponent.js';

function MainPage() {
  return (
    <div className='homepage'>
        <Header />
        <div className='vpbuilding'>

        </div>
        <div className='intro_text'>
            <h1>TECH GLIMPSE</h1>
            Vidyalankar is a well-known college for its diploma courses. It offers courses such as Information Technology,
            Computer Science and Electronics and Telecommunication. It is situated at Wadala. Several technical events are conducted by Vidyalankar.
            Their mission is to pull out the true potential from students through these events, students can get knowledge from some brilliant personalities.
            They also offer certificates for participation and prizes for winners. It also opens a variety of opportunities for students as  many companies are a part of this events.
        </div>
        <div className='our_projects'>
            <h1>OUR PROJECTS</h1>
            <div className='projects'>
            <Card sx={{ maxWidth: 375, mx: 1 }}>
            <CardMedia
                component="img"
                height="180"
                image={project1}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Arduino Obstacle Avoider Robot
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Obstacle Avoiding Robot is an intelligent device which can automatically sense the obstacle in front of it and avoid them by turning itself.
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ maxWidth: 375, mx: 1 }}>
            <CardMedia
                component="img"
                height="180"
                image={project2}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Wind Energy Power Plant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    A mini project displaying the conversion of wind energy into electricity with the help of generator.
                </Typography>
            </CardContent>
            </Card>
            </div>
        </div>
        <div className='footer_carousel'>
            <CarouselComponent/>
        </div>
    </div>
  )
}

export default MainPage