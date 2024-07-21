import React from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { PageLink, PageTitle } from '../../../_metronic/layout/core';
import HomeEvents from './components/HomeEvents/homeEvents';
import Home from './home';
import HomeHeader from './components/homeHeader/homeHeader';
import HomeDirectory from './components/HomeDirectory/homeDirectory';
import HomeEventDetail from './components/HomeEvents/homeEventDetail';
import HomeNews from './components/HomeNews/homeNews';
import HomeNewsDetail from './components/HomeNews/homeNewsDetail';
import HomeDonation from './components/HomeDonation/homeDonation';
import Aboutus from './components/aboutUs/aboutus';
import Contactus from './components/contactUs/contactus';
import HomeTestimonials from './components/homeTestimonials/homeTestimonial';
import Reward from './components/RewardsAndBenefits/Reward/reward';
import Benefits from './components/RewardsAndBenefits/Benefits/benefits';
import Footer from './components/footer/footer';

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Dsu',
    path: '/dsu',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
];

const DsuPage: React.FC = () => {
  return (
    <>
      <HomeHeader />
      <Routes>
        <Route
          element={
            <>
              {/* <Events /> */}
              <Outlet />
            </>
          }
        >
          <Route
            path='home'
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path='event'
            element={
              <>
                <HomeEvents />
              </>
            }
          />
          <Route
            path='eventDetail/:id'
            element={
              <>
                <HomeEventDetail />
              </>
            }
          />
          <Route
            path='news'
            element={
              <>
                <HomeNews />
              </>
            }
          />
          <Route
            path='newsDetail/:id'
            element={
              <>
                <HomeNewsDetail />
              </>
            }
          />
          <Route
            path='association'
            element={
              <>
                {/* <Association /> */}
              </>
            }
          />
          <Route
            path='card'
            element={
              <>
                {/* <Card /> */}
              </>
            }
          />
          <Route
            path='corporate'
            element={
              <>
                {/* <CorportaePartner /> */}
              </>
            }
          />
          <Route
            path='directory'
            element={
              <>
                <HomeDirectory />
              </>
            }
          />
          <Route
            path='donation'
            element={
              <>
                <HomeDonation />
              </>
            }
          />
          <Route
            path='jobs'
            element={
              <>
                {/* <Job /> */}
              </>
            }
          />
          <Route
            path='testimonial'
            element={
              <>
                <HomeTestimonials />
              </>
            }
          />
          <Route
            path='about'
            element={
              <>
                <Aboutus />
              </>
            }
          />
          <Route
            path='contact'
            element={
              <>
                <Contactus />
              </>
            }
          />
          <Route
            path='reward'
            element={
              <>
                <Reward />
              </>
            }
          />
          <Route
            path='benefits'
            element={
              <>
                <Benefits />
              </>
            }
          />
          <Route index element={<Navigate to='/dsu/home' />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default DsuPage;
