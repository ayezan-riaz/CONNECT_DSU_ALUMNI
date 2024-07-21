import { Nav, NavDropdown, Navbar, Form, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from '../../pages/alumni/assets/homelogo.png'
import './home.css'
import React, { useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import HomeHeader from './components/homeHeader/homeHeader'
import Carousel from './components/carousel/carousel'
import HomeEvents from './components/HomeEvents/homeEvents'
import Reward from './components/RewardsAndBenefits/Reward/reward'
import OurAlumni from './components/ourAlumni/ourAlumni'
import AlumniMeetup from './components/alumniMeetUp/alumnimeetup'
import Footer from './components/footer/footer'

const Home: React.FC = () => {
  return (
    // <Home>
    <>
      <div className='row'>
        <HomeHeader />
        <Carousel />
      </div>

      <div className='container'>
        <Reward />

      </div>
      <div className='row'>
        <AlumniMeetup />
      </div>
      <div className='container'>
        <OurAlumni />
      </div>


    </>
  )
}

export default Home
