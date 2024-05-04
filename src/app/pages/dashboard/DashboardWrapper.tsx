/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useIntl } from 'react-intl' // Make sure to import useIntl from react-intl

import { PageTitle } from '../../../_metronic/layout/core'
import { } from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => (
  <div className="container">
    <div className="row">
      <div className="col-12">
        <h1 style={{ color: 'gray', textAlign: 'center', fontSize: '70px', fontWeight: 'bold', marginTop: '120px' }}>WELCOME TO ALUMNI
          <br />  PORTAL</h1>
      </div>
    </div>
  </div> // Move the closing div tag to this line
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
