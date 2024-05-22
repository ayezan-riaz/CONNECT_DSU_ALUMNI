/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

// import {FC} from 'react'
// import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
// import {PrivateRoutes} from './PrivateRoutes'
// import {ErrorsPage} from '../modules/errors/ErrorsPage'
// import {Logout, AuthPage, useAuth} from '../modules/auth'
// //import {Logout, AuthPage, useAuth} from '../pages/alumni/auth'
// import {App} from '../App'
// //import {Step1} from '../modules/auth/components/Register/wizards/components/steps/Step1'

// /**
//  * Base URL of the website.
//  *
//  * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
//  */
// const {PUBLIC_URL} = process.env

// const AppRoutes: FC = () => {
//   const {currentUser} = useAuth()
//   return (
//     <BrowserRouter basename={PUBLIC_URL}>
//       <Routes>
//         <Route element={<App />}>
//           <Route path='error/*' element={<ErrorsPage />} />
//           <Route path='logout' element={<Logout />} />
//           {currentUser ? (
//             <>
//               <Route path='/*' element={<PrivateRoutes />} />
//               <Route index element={<Navigate to='/dashboard' />} />
//             </>
//           ) : (
//             <>
//               <Route path='home/*' element={<AuthPage />} />
//               <Route path='*' element={<Navigate to='/home' />} />
//               {/* <Route
//                 path='/auth/components/Register/wizards/components/steps/Step1'
//                 element={<Step1 />}
//               /> */}
//             </>
//           )}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export {AppRoutes}

/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
//import {Logout, AuthPage, useAuth} from '../pages/alumni/auth'
import {App} from '../App'

//import {Step1} from '../modules/auth/components/Register/wizards/components/steps/Step1'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {currentUser ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (
            <>
     {/* Render AuthPage by default for home route */}
     <Route path='home/*' element={<AuthPage />} />
              {/* Render AuthPage for login route */}
              <Route path='login/*' element={<AuthPage />} />
              {/* Redirect to home for other routes */}
              <Route path='*' element={<Navigate to='/home' />} />
              {/* <Route
                path='/auth/components/Register/wizards/components/steps/Step1'
                element={<Step1 />}
              /> */}
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
