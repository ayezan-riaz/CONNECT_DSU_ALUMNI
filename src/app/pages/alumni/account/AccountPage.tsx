import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import {Settings} from './components/settings/Settings'
import {Skills} from './components/skills/Skills'
import {AccountHeader} from './AccountHeader'
import {Academics} from './components/academics/Academics'
import Work from './components/work/Work'

import Survey from './components/survey/Survey'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Account',
    path: '/account',
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

const AlumniAccountPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <AccountHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Profile</PageTitle>
              <Overview />
            </>
          }
        />
        <Route
          path='settings'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
              <Settings />
            </>
          }
        />

        <Route
          path='skills'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Skills</PageTitle>
              <Skills />
            </>
          }
        />

        <Route
          path='academics'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Academics</PageTitle>
              <Academics />
            </>
          }
        />

        <Route
          path='work'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Work</PageTitle>
              <Work />
            </>
          }
        />

        <Route
          path='survey'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Survey</PageTitle>
              <Survey />
            </>
          }
        />
        <Route index element={<Navigate to='/account/overview' />} />
      </Route>
    </Routes>
  )
}

export default AlumniAccountPage
