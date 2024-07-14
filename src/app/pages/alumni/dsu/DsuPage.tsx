import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
import { Events } from './components/event/Events'
import { Association } from './components/association/Association'
import { Card } from './components/card/Card'
import { CorportaePartner } from './components/corporatePartner/CorportaePartner'
import { Directory } from './components/directory/Directory'
import { News } from './components/news/News'
import { Testimonials } from './components/testimonials/Testimonials'
import { Donation } from './components/donation/Donation'
import { Job } from './components/jobs/Job'
import { EventDetails } from './components/event/EventDetails'
import { NewsDetails } from './components/news/NewsDetail'
import ApprovedJobs from './components/jobs/components/approvedJobs'
import { UserManagement } from './components/UserManagement/userManagement'
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
          path='event'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Profile</PageTitle> */}
              <Events />
            </>
          }
        />
        {/* <Route path='eventDetail/:id' element={<EventDetails />} /> Add this route */}

        <Route
          path='association'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle> */}
              <Association />
            </>
          }
        />

        <Route
          path='eventDetail/:id'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle> */}
              <EventDetails />
            </>
          }
        />
        <Route
          path='newsDetail/:id'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle> */}
              <NewsDetails />
            </>
          }
        />
        <Route
          path='card'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Skills</PageTitle> */}
              <Card />
            </>
          }
        />

        <Route
          path='corporate'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Academics</PageTitle> */}
              <CorportaePartner />
            </>
          }
        />

        <Route
          path='directory'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              <Directory />
            </>
          }
        />
        <Route
          path='news'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              <News />
            </>
          }
        />
        <Route
          path='donation'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              <Donation />
            </>
          }
        />
        <Route
          path='jobs'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              <Job />
            </>
          }
        />
        <Route
          path='approvejobs'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              <ApprovedJobs />
            </>
          }
        />
        <Route
          path='testimonial'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              <Testimonials />
            </>
          }
        />

        <Route
          path='usermanagement'
          element={
            <>
              {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle> */}
              <UserManagement />
            </>
          }
        />

        {/* <Route index element={<Navigate to='/dsu/events' />} /> */}
      </Route>
    </Routes>
  )
}

export default DsuPage
