import { Nav, NavDropdown, Navbar, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../pages/alumni/assets/homelogo.png';
import './home.css';
import React, { useState } from 'react';
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers';
import HomeHeader from './components/homeHeader/homeHeader';
import Carousel from './components/carousel/carousel';
import HomeEvents from './components/HomeEvents/homeEvents';


const Home :React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
};
    return (

  // <Home>
 <>
 <div className='row'>

<HomeHeader />
<Carousel/>
 </div>
<div className="container">

<HomeEvents/>
</div>

   
        </>





      );
}

export default Home