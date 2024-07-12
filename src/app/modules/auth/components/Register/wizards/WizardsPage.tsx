import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../../_metronic/layout/core'

import {Vertical} from './components/Vertical'
import React from 'react'
const wizardsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Wizards',
    path: '/crafted/pages/wizards/horizontal',
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

const WizardsPage = () => (
  <Routes>
    <Route element={<Outlet />}>
      ToastContainer
      <Route
        path='vertical'
        element={
          <>
            <PageTitle breadcrumbs={wizardsBreadCrumbs}>Vertical</PageTitle>
            <Vertical />
          </>
        }
      />
      <Route index element={<Navigate to='/crafted/pages/wizards/horizontal' />} />
    </Route>
  </Routes>
)

export default WizardsPage
