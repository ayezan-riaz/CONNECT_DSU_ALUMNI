import React, { useState } from 'react';
import { Nav, NavDropdown, Navbar, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../../../pages/alumni/assets/homelogo.png';
import './homeHeader.css';

const HomeHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  return (
    <div className='fixed-top bg'>
      <div className='container-fluid'>
        {/* Icon Section */}
        <div className='row'>
          <div className='col-12 d-flex justify-content-start align-items-center bg p-2'>|
            <a href='https://www.facebook.com/dha.suffa/' className='fa fa-facebook text-white mx-2' />|
            <a href='https://twitter.com/lifeatdsu' className='fa fa-twitter text-white mx-2' />|
            <a href='https://www.instagram.com' className='fa fa-instagram text-white mx-2' />|
            <a href='https://www.linkedin.com/school/dha-suffa-university/' className='fa fa-linkedin text-white mx-2' />|
            <a href='https://www.youtube.com/c/DHASuffaUniversityOfficial/videos' className='fa fa-youtube text-white mx-2' />|
            <a href='https://www.dsu.edu.pk/wp-content/uploads/2024/01/DSU_NEWSLETTER_2023_RECOVER_NEW.pdf' className='fa fa-rss text-white mx-2'></a>
          </div>
        </div>

        {/* Moving Text Section */}
        <div className='row'>
          <div className='col-12 bg'>
            <div className='slider'>
              <div className='slider-inner'>
                <p id='moving-text'>
                  Online applications for Fall 2024 Semester for BE Mechanical Engineering, BE Electrical Engineering, BE Civil Engineering (Superhighway campus), BS Computer Science (Superhighway campus), BS Computer Science (Main campus), BS Software Engineering (Main Campus), BS Engineering technology (Computer), BS Cyber Security (Main campus), BS Multimedia and Gaming (Main Campus), BS Data Science (Main Campus), BS (Artificial Intelligence) (Main Campus), BBA, BS (Business Analytics and Programming), BS (Accounting & Finance), BS (International Relations), BS (English), BS (Psychology), MPhil (Psychology), MBA, MS (MS/CS) and PhD (MS/ME/EE/CS) Programs are Open. Last date to apply and pay the fee is 20 May 2024 and on-campus test will be held on 21 May 2024 (tentative) at MAIN CAMPUS DHA Phase 7ext. and Online test will be held on 22 May 2024 Tentative Note: Admit card will be issued to the registered candidates one day before test date on their provided email address For details, please call 021 35244851-52 & 0324-2444595..
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar Section */}
        <div className='row'>
          <div className='col-12 bg'>
            <nav className='navbar navbar-expand-sm navbar-dark'>
              <div className='container-fluid'>
                <Link to='/home'>
                  <a className='navbar-brand'>
                    <img src={Logo} alt='Logo' width={'100%'} height={'100px'} />
                  </a>
                </Link>
                <button className='navbar-toggler' type='button' onClick={toggleMenu}>
                  {menuOpen ? <span>&times;</span> : <span>&#9776;</span>}
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
                  <ul className='navbar-nav ml-auto'>
                    <Link to='/home'>
                      <li className='nav-item'>
                        <a className='nav-link'>
                          <span className='bg'>Home</span>
                        </a>
                      </li>
                    </Link>
                    <li className='nav-item'>
                      <a className='nav-link' href='https://www.dsu.edu.pk/about-us/' rel='noopener noreferrer'>
                        <span className='bg'>About Us</span>
                      </a>
                    </li>
                    <Link to='/mydsu'>
                      <li className='nav-item'>
                        <a className='nav-link' href='#'>
                          <span className='bg'>My DSU</span>
                        </a>
                      </li>
                    </Link>
                    <Link to='#'>
                      <li className='nav-item dropdown'>
                        <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false' style={{ color: 'white' }}>
                          Benefits
                        </a>
                        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                          {/* <li>
                            <Link className='dropdown-item' to='/dsu/reward'>
                              Reward
                            </Link>
                          </li> */}
                          <li>
                            <Link className='dropdown-item' to='/dsu/benefits'>
                              Benefits
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </Link>
                    <Link to='/dsu/testimonial'>
                      <li className='nav-item'>
                        <a className='nav-link' href='#'>
                          <span className='bg'>Testimonials</span>
                        </a>
                      </li>
                    </Link>
                    <Link to='#'>
                      <li className='nav-item dropdown'>
                        <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false' style={{ color: 'white' }}>
                          News & Events
                        </a>
                        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                          <li>
                            <Link className='dropdown-item' to='/dsu/news'>
                              News
                            </Link>
                          </li>
                          <li>
                            <Link className='dropdown-item' to='/dsu/event'>
                              Events
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </Link>
                    <Link to='/donation'>
                      <li className='nav-item'>
                        <a className='nav-link' href='#'>
                          <span className='bg'>Donation</span>
                        </a>
                      </li>
                    </Link>
                    <li className='nav-item'>
                      <a className='nav-link' href='https://www.dsu.edu.pk/contact-us/' rel='noopener noreferrer'>
                        <span className='bg'>Contact Us </span>
                      </a>
                    </li>
                    <Link to='/auth/registration'>
                      <li className='nav-item'>
                        <a className='nav-link' href='#'>
                          <span className='bg'>Resgister as Alumni</span>
                        </a>
                      </li>
                    </Link>
                    <Link to='/auth'>
                      <li className='nav-item'>
                        <a className='nav-link' href='#'>
                          <span className='bg'>Login </span>
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
