import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <ul>
        <li><NavLink to={'/'}><i className='fa-solid fa-cloud-sun'></i> Home</NavLink></li>
        <li><NavLink to={'/favorites'}><i className='fa-solid fa-star'></i> Favorites</NavLink></li>
      </ul>
      
    </div>
  )
}

export default Navbar