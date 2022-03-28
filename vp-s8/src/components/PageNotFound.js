import React from 'react';
import Header from './Header';
import '../styles/PageNotFound.css';
import tv from '../assets/404tv.gif';

function PageNotFound() {
  return (
    <div>
      <Header />
      <div className='pnf'>
        <h1 className='pnf1'>Sorry, page not found</h1>
        <p className='pnf2'>Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.</p>
        <img className='tv' src={tv} alt="404TV" />
      </div>
    </div>
  )
}

export default PageNotFound