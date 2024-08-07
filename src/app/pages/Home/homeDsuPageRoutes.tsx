import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import HomeEvents from './components/HomeEvents/homeEvents'
import Home from './home'
import HomeHeader from './components/homeHeader/homeHeader'
import HomeDirectory from './components/HomeDirectory/homeDirectory'
import HomeEventDetail from './components/HomeEvents/homeEventDetail'
import HomeNews from './components/HomeNews/homeNews'
import HomeNewsDetail from './components/HomeNews/homeNewsDetail'
import HomeDonation from './components/HomeDonation/homeDonation'
import Aboutus from './components/aboutUs/aboutus'
import Contactus from './components/contactUs/contactus'
import HomeTestimonials from './components/homeTestimonials/homeTestimonial'
import Reward from './components/RewardsAndBenefits/Reward/reward'
import Benefits from './components/RewardsAndBenefits/Benefits/benefits'
import Footer from './components/footer/footer'
// import { Events } from './components/event/Events'
// import { Association } from './components/association/Association'
// import { Card } from './components/card/Card'
// import { CorportaePartner } from './components/corporatePartner/CorportaePartner'
// import { Directory } from './components/directory/Directory'
// import { News } from './components/news/News'
// import { Testimonials } from './components/testimonials/Testimonials'
// import { Donation } from './components/donation/Donation'
// import { Job } from './components/jobs/Job'
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
]

const DsuPage: React.FC = () => {
  return (
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
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Profile</PageTitle> */}

              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path='event'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Profile</PageTitle> */}
              <div className='row' style={{ marginTop: '175px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <HomeEvents />
              </div>
            </>
          }
        />

        <Route
          path='eventDetail/:id'
          element={
            <>
              <div className='row' style={{ marginTop: '175px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <HomeEventDetail />
              </div>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle> */}
            </>
          }
        />
        <Route
          path='news'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Profile</PageTitle> */}
              <div className='row' style={{ marginTop: '175px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <HomeNews />

              </div>



            </>
          }
        />
        <Route
          path='newsDetail/:id'
          element={
            <>
              <div className='row' style={{ marginTop: '175px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <HomeNewsDetail />
              </div>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle> */}
            </>
          }
        />

        <Route
          path='association'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle> */}
              {/* <Association /> */}
            </>
          }
        />

        <Route
          path='card'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Skills</PageTitle> */}
              {/* <Card /> */}
            </>
          }
        />

        <Route
          path='corporate'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Academics</PageTitle> */}
              {/* <CorportaePartner /> */}
            </>
          }
        />

        <Route
          path='directory'
          element={
            <>
              <div className='row' style={{ marginTop: '175px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <HomeDirectory />
              </div>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              {/* <Directory /> */}
              {/* {HomeDirectory} */}
            </>
          }
        />

        <Route
          path='news'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              {/* <News /> */}
            </>
          }
        />
        <Route
          path='donation'
          element={
            <>
              <div className='row' style={{ marginTop: '175px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <HomeDonation />
              </div>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              {/* <Donation /> */}
            </>
          }
        />
        <Route
          path='jobs'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              {/* <Job /> */}
            </>
          }
        />

        <Route
          path='testimonial'
          element={
            <>
              <div className='row' style={{ marginTop: '195px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <HomeTestimonials />
              </div>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              {/* <Testimonials /> */}
            </>
          }
        />
        <Route
          path='about'
          element={
            <>
              <div className='row' style={{ marginTop: '175px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <Aboutus />
              </div>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              {/* <Testimonials /> */}
            </>
          }
        />
        <Route
          path='contact'
          element={
            <>
              <div className='row' style={{ marginTop: '175px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <Contactus />
              </div>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              {/* <Testimonials /> */}
            </>
          }
        />
        <Route
          path='reward'
          element={
            <>
              <div className='row' style={{ marginTop: '175px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <Reward />
              </div>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              {/* <Testimonials /> */}
            </>
          }
        />
        <Route
          path='benefits'
          element={
            <>
              <div className='row' style={{ marginTop: '175px' }}>
                <HomeHeader />
              </div>
              <div className='row'>
                <Benefits />
              </div>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              {/* <Testimonials /> */}
            </>
          }
        />
        {/* <Route index element={<Navigate to='/dsu/events' />} /> */}
      </Route>
    </Routes>
  )
}

export default DsuPage
