import React from 'react';
import '../styles/Images.css';
import Footer from './Footer';
import Header from './Header';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';
import image7 from '../assets/image7.png';
import image8 from '../assets/image8.png';
import image9 from '../assets/image9.png';
import image10 from '../assets/image10.png';

function Images() {
  return (
    <div>
        <Header />
        <div className='images'>
          <div className='im1'>
            <img alt='image1' src={image1} className="image1" />
            <img alt='image2' src={image2} className="image2" />
            <img alt='image9' src={image9} className="image9" />
            <img alt='image10' src={image10} className="image1" />
          </div>
          <div className='im2'>
            <img alt='image3' src={image3} className="image3" />
            <img alt='image4' src={image4} className="image4" />
            <img alt='image3' src={image3} className="image3" />
          </div>
          <div className='im3'>
            <img alt='image5' src={image5} className="image5" />
            <img alt='image6' src={image6} className="image6" />
            <img alt='image7' src={image7} className="image7" />
            <img alt='image8' src={image8} className="image8" />
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Images