import { Nav, NavDropdown, Navbar, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../pages/alumni/assets/homelogo.png';
import './home.css';
import React, { useState } from 'react';
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers';
import HomeHeader from './components/homeHeader/homeHeader';
import Carousel from './components/carousel/carousel';


const Home :React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
};
    return (

  // <Home>
 <>
<HomeHeader />
<div style={{marginTop:"170px"}} >

<Carousel/>
</div>
{/* <div className="container">
  <div className="box" style={{ backgroundImage: "url(img/1.jpg)" }} />
  <div className="box" style={{ backgroundImage: "url(img/2.jpg)" }} />
  <div className="box" style={{ backgroundImage: "url(img/3.jpg)" }} />
  <div className="box" style={{ backgroundImage: "url(img/4.jpg)" }} />
</div> */}

   
        </>





      );
}

export default Home