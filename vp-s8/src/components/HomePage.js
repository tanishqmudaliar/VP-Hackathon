import React from 'react';
import '../styles/HomePage.css';
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import Carousel from './Carousel.js';
import Header from './Header.js';
import Footer from './Footer';

function HomePage() {
    return (
        <div>
            <Header />
            <div className='vpbuilding' />
            <div className='intro_text'>
                <h1>Tech Glimpse</h1>
                Vidyalankar is a well-known college for its diploma courses. It offers courses such as Information Technology,
                Computer Science and Electronics and Telecommunication. It is situated at Wadala. Several technical events are conducted by Vidyalankar.
                Their mission is to pull out the true potential from students through these events, students can get knowledge from some brilliant personalities.
                They also offer certificates for participation and prizes for winners. It also opens a variety of opportunities for students as  many companies are a part of this events.
            </div>
            <div className='our_projects'>
                <h1>Our Projects</h1>
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
            <Carousel/>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage