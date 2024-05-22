import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'

import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
// My Route Components
import TestPage from '../pages/alumni/examplePage/TestPage'
// import JobPosting from '../pages/alumni/job/jobPosting'
import Work from '../pages/alumni/userManagement/Usertable'
import Usertable from '../pages/alumni/userManagement/Usertable'
// import UserManagementList from '../pages/alumni/userManagementView/UserManagementList'
import UserManagementList from '../pages/alumni/userManagementView/UserManagementList'
//import {Step1} from '../modules/auth/components/Register/wizards/components/steps/Step1'
import ShowUser from '../pages/alumni/userManagementView/ShowUser'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  // Alumni Routes
  const AlumniAccountPage = lazy(() => import('../pages/alumni/account/AccountPage'))
const DsuPage =lazy(()=>import('../pages/alumni/dsu/DsuPage'))
  const JobPosting = lazy(() => import('../pages/alumni/jobPost/JobPosting'))
  const ViewAllJobs = lazy(() => import('../pages/alumni/viewJobs/viewAllJobs'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='login/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* <Route path='job-post' element={<MenujobPosting />} /> */}

        {/* Starting all Alumni Routes */}
        <Route path='test-page' element={<TestPage />} />
        {/* <Route path='/alumni/job'
          element={
            <SuspensedView>
              <JobPosting />
            </SuspensedView>
          }

        /> */}
        <Route path='user-managemnet' element={<Usertable />} />
        <Route path='user-managemnet-list' element={<UserManagementList />} />
        {/* <Route path='viewUser' element={<ShowUser user={undefined} />} /> */}
        <Route path="viewUser" element={<ShowUser />} />
        {/* <Route exact path='/viewuser/:userId' component={ViewUser} />
 */}
        {/* Lazy Modules */}

        <Route
          path='/alumni/jobPost/*'
          element={
            <SuspensedView>
              <JobPosting />
            </SuspensedView>
          }
        />

        <Route
          path='/alumni/viewJobs/*'
          element={
            <SuspensedView>
              <ViewAllJobs />
            </SuspensedView>
          }
        />

        <Route
          path='/alumni/account/*'
          element={
            <SuspensedView>
              <AlumniAccountPage />
            </SuspensedView>
          }
        />

           <Route
          path='/alumni/dsu/*'
          element={
            <SuspensedView>
              <DsuPage />
            </SuspensedView>
          }
        />
        {/* <Route path='/alumni/auth/*' element={<Navigate to='/dashboard' />} /> */}
        {/*Ending Alumni Routes */}

        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />

        {/* <Route
          path='/auth/components/Register/wizards/components/steps/Step1'
          element={<Step1 />}
        /> */}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
