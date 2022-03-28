import React from 'react';
import ReactPlayer from 'react-player';
import '../styles/Videos.css';
import Footer from './Footer';
import Header from './Header';

function Videos() {
  return (
    <div className='videos'>
        <Header />
        <div className='vd'>
            <ReactPlayer
                controls
                className="video"
                width="45vw"
                height="50vh"
                url="https://youtu.be/uy9F3Dmeic8"
            />
            <ReactPlayer
                width="45vw"
                height="50vh"
                url="https://youtu.be/Me0Pc8xD4wQ"
            />
        </div>
        <div className='vdrest'>
            <ReactPlayer
                controls
                className="video"
                width="45vw"
                height="50vh"
                url="https://youtu.be/xfXwAWUrDcg"
            />
            <ReactPlayer
                width="45vw"
                height="50vh"
                url="https://youtu.be/DVBVrN6A19E"
            />
        </div>
        <div className='vdrest1'>
            <ReactPlayer
                controls
                className="video"
                width="45vw"
                height="50vh"
                url="https://youtu.be/mph3EV0_Si0"
            />
            <ReactPlayer
                width="45vw"
                height="50vh"
                url="https://youtu.be/_Ne0Q1gSwHs"
            />
        </div>
        <Footer />
    </div>
  )
}

export default Videos