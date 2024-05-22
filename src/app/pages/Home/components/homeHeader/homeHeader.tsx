import { Nav, NavDropdown, Navbar, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Logo from '../../pages/alumni/assets/homelogo.png';
import Logo from '../../../../pages/alumni/assets/homelogo.png'
import './homeHeader.css';
import React, { useState } from 'react';
import {  KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers';
import path from 'path';




const HomeHeader :React.FC= () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen); // Toggle the menu state
  };
  return (
<>
<div className="fixed-top bg" >
 <div className='col-lg-12 col-md-12 col-sm-12 bg '>
{/* <div className="social-icons-container">
  <div className="social-icon-box facebook">
    <div className="icon-face">
      <i className="fa fa-facebook" />
    </div>
  </div>
  <div className="social-icon-box twitter">
    <div className="icon-face">
      <i className="fa fa-twitter" />
    </div>
  </div>
  <div className="social-icon-box instagram">
    <div className="icon-face">
      <i className="fa fa-instagram" />
    </div>
  </div>
  <div className="social-icon-box linkedin">
    <div className="icon-face">
      <i className="fa fa-linkedin" />
    </div>
  </div>
  <div className="social-icon-box github">
    <div className="icon-face">
      <i className="fa fa-github" />
    </div>
  </div>
</div> */}

        <KTSVG path="media/icons/duotune/social/soc006.svg" className="svg-icon-muted svg-icon-2hx svg-icon-white" />

        <KTSVG path="media/icons/duotune/social/soc004.svg" className="svg-icon-muted svg-icon-2hx" />
        {/* <img src={toAbsoluteUrl("media/icons/duotune/social/soc006.svg")} style={{color:"white"}} /> */}
        </div>
        <div className='col-lg-12 col-md-12 col-sm-12 bg '>
      
        <div className="slider">
            <div className="slider-inner">
                <p id="moving-text">Online applications for Fall 2024 Semester for BE Mechanical Engineering, BE Electrical Engineering, BE Civil Engineering (Superhighway campus), BS Computer Science (Superhighway campus), BS Computer Science (Main campus) , BS Software Engineering (Main Campus), BS Engineering technology (Computer), BS Cyber Security (Main campus), BS Multimedia and Gaming (Main Campus), BS Data Science (Main Campus), BS (Artificial Intelligence) (Main Campus), BBA, BS (Business Analytics and Programming), BS (Accounting & Finance), BS (International Relations), BS (English), BS (Psychology), MPhil (Psychology), MBA, MS (MS/CS) and PhD (MS/ME/EE/CS) Programs are Open. Last date to apply and pay the fee is 20 May 2024 and on-campus test will be held on 21 May 2024 (tentative) at MAIN CAMPUS DHA Phase 7ext. and Online test will be held on 22 May 2024 Tentative Note: Admit card will be issued to the registered candidates one day before test date on their provided email address For details, please call 021 35244851-52 & 0324-2444595..</p>
            </div>
  
    </div>
        </div>
        <div className='col-lg-12 col-md-12 col-sm-12 bg'>
         <nav className="navbar  navbar-expand-sm navbar-dark ">
   
            <div className="container-fluid">
            <Link to="/home"><a className="navbar-brand"><img src={Logo} alt='Logo' width={"100%"} height={"100px"} /></a>
            </Link>  
                <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                    {menuOpen ? (
                        <span>&times;</span> // Close icon
                    ) : (
                        <span>&#9776;</span> // Menu icon
                    )}
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ml-auto">
                    <Link to="/home">  <li className="nav-item">
                            <a className="nav-link" ><span className='bg'>Home</span></a>
                        </li>
                        </Link>  
                        <Link to="/about"> 
                        <li className="nav-item">
                            <a className="nav-link" href="#"> <span className='bg'>About Us</span></a>
                        </li>
                        </Link>  
                        <Link to="/about"> 
                        <li className="nav-item">
                            <a className="nav-link" href="#"> <span className='bg'>My DSU</span></a>
                        </li>
                        </Link>  
                      
                        <Link to="/about"> 
                        <li className="nav-item">
                            <a className="nav-link" href="#"> <span className='bg'>Reward & Benefits</span></a>
                        </li>
                        </Link>  
                      
                        <Link to="/about"> 
                        <li className="nav-item">
                            <a className="nav-link" href="#"> <span className='bg'>Testimonials</span></a>
                        </li>
                        </Link>  
                      
                        {/* <Link to="/about"> 
                        <li className="nav-item">
                            <a className="nav-link" href="#"> <span className='bg'>Alumni Cards</span></a>
                        </li>
                        </Link>   */}
                      
                        <Link to="/about"> 
                        <li className="nav-item">
                            <a className="nav-link" href="#"> <span className='bg'>Alumni Association Election</span></a>
                        </li>
                        </Link>  
                      
                        <Link to="/about"> 
                        <li className="nav-item">
                            <a className="nav-link" href="#"> <span className='bg'>News & Events</span></a>
                        </li>
                        </Link>  
                      
                      
                        <Link to="/login">

                        <li className="nav-item">
                            <a className="nav-link" href="#"> <span className='bg'>Donation </span></a>
                        </li>
                        </Link>
                        <Link to="/login">

                        <li className="nav-item">
                            <a className="nav-link" href="#"> <span className='bg'>Contact Us  </span></a>
                        </li>
                        </Link>
                        <Link to="/login">

<li className="nav-item">
    <a className="nav-link" href="#"> <span className='bg'>Login  </span></a>
</li>
</Link>
                    </ul>
                </div>
            </div>
            
        </nav>
        </div>
        </div>

</>
  )
}

export default HomeHeader