// import { useEffect, useState } from 'react';
// import * as Yup from 'yup';
// import clsx from 'clsx';
// import { Link, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import axios from 'axios'; // Import Axios
// import { useAuth } from '../core/Auth';
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { Console } from 'console';

// const loginSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Wrong email format')
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('Password is required'),
// });

// const initialValues = {
//   email: 'admin@demo.com',
//   password: 'demo',
// };

// export function Login() {

//   const [loading, setLoading] = useState(false);
//   const { saveAuth, setCurrentUser } = useAuth();
//   // const history = useHistory(); // React Router history object to redirect
//   // const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues,
//     validationSchema: loginSchema,
//     onSubmit: async (values, { setStatus, setSubmitting }) => {
//       setLoading(true);
//       try {
//         const response = await axios.post('http://13.200.151.68:3000/api/login', {
//           email: values.email,
//           password: values.password,
//         });

//         const { access_token } = response.data;
//         // console.log('AcessToken: ', access_token)
//         saveAuth(access_token); // Save access token to local storage

//         // Fetch user details using the access token
//         const userResponse = await axios.get('http://13.200.151.68:3000/api/protected', {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         });
//         const { sub } = userResponse.data;
//         console.log("Sub", sub);
//         localStorage.setItem('sub', sub);
//         // saveAuth(sub);Save Sub to local storage
//         // const user = response.data;
//         // setCurrentUser(user);
//         setCurrentUser(response.data);
//         setLoading(false);

//         // Use <Navigate /> to redirect to the dashboard on successful login
//         return <Navigate to='/dashboard' />;
//       } catch (error) {
//         console.error(error);
//         // Here, save the error response message instead of data
//         setStatus('The login details are incorrect'); // You might want to use error.response.data.message or a more detailed error message from the server.
//         setSubmitting(false);
//         setLoading(false);
//       }
//     },
//   });

//   // Rest of the component code remains the same
//   // ...

//   return (
//     <form
//       className='form w-100'
//       onSubmit={formik.handleSubmit}
//       noValidate
//       id='kt_login_signin_form'
//     >
//       {/* begin::Heading */}
//       <div className='text-center mb-11'>
//         <h1 className=' fw-bolder mb-3 text-dark'> running Welcome To The Alumni Portal</h1>
//       </div>

//       {formik.status ? (
//         <div className='mb-lg-15 alert alert-danger'>
//           <div className='alert-text font-weight-bold'>{formik.status}</div>
//         </div>
//       ) : (
//         <div></div>
//       )}

//       {/* begin::Form group */}
//       <div className='fv-row mb-8'>
//         <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
//         <input
//           placeholder='Email'
//           {...formik.getFieldProps('email')}
//           className={clsx(
//             'form-control bg-transparent',
//             { 'is-invalid': formik.touched.email && formik.errors.email },
//             {
//               'is-valid': formik.touched.email && !formik.errors.email,
//             }
//           )}
//           type='email'
//           name='email'
//           autoComplete='off'
//         />
//         {formik.touched.email && formik.errors.email && (
//           <div className='fv-plugins-message-container'>
//             <span role='alert'>{formik.errors.email}</span>
//           </div>
//         )}
//       </div>
//       {/* end::Form group */}

//       {/* begin::Form group */}
//       <div className='fv-row mb-3'>
//         <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
//         <input
//           type='password'
//           autoComplete='off'
//           {...formik.getFieldProps('password')}
//           className={clsx(
//             'form-control bg-transparent',
//             {
//               'is-invalid': formik.touched.password && formik.errors.password,
//             },
//             {
//               'is-valid': formik.touched.password && !formik.errors.password,
//             }
//           )}
//         />
//         {formik.touched.password && formik.errors.password && (
//           <div className='fv-plugins-message-container'>
//             <div className='fv-help-block'>
//               <span role='alert'>{formik.errors.password}</span>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* end::Form group */}

//       {/* begin::Wrapper */}
//       <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
//         <div />

//         {/* begin::Link */}
//         <Link to='/auth/forgot-password' style={{ color: '#80171D' }}>
//           Forgot Password ?
//         </Link>
//         {/* end::Link */}
//       </div>
//       {/* end::Wrapper */}

//       {/* begin::Action */}
//       <div className='d-grid mb-10'>

//         <button
//           type='submit'
//           id='kt_sign_in_submit'
//           className='btn '
//           style={{
//             backgroundColor: '#80171D',
//           }}
//           disabled={formik.isSubmitting || !formik.isValid}
//         >
//           {!loading && (
//             <span className='indicator-label' style={{ color: 'white' }}>
//               Sign In
//             </span>
//           )}
//           {loading && (
//             <span className='indicator-progress' style={{ display: 'block' }}>
//               Please wait...
//               <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
//             </span>
//           )}
//         </button>
//       </div>
//       {/* end::Action */}

//       <div className='text-gray-500 text-center fw-semibold fs-6'>
//         Not a Member yet?{' '}
//         <Link to='/auth/registration' style={{ color: '#80171D' }}>
//           Create an Account
//         </Link>
//       </div>
//     </form>
//   )
// }
import {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'
import {useAuth} from '../core/Auth'
import React from 'react'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'admin@demo.com',
  password: 'demo',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const response = await axios.post('http://13.200.151.68:3000/api/login', {
          email: values.email,
          password: values.password,
        })

        const {access_token} = response.data
        localStorage.setItem('token', access_token) // Save access token to local storage
        saveAuth(access_token) // Save token using context

        // Fetch user details using the access token
        const userResponse = await axios.get('http://13.200.151.68:3000/api/protected', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        const {sub} = userResponse.data
        console.log('Sub', sub)
        localStorage.setItem('sub', sub)
        setCurrentUser(userResponse.data) // Set current user in context
        setLoading(false)

        // Redirect to the dashboard on successful login
        navigate('/dashboard')
      } catch (error) {
        console.error(error)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className=' fw-bolder mb-3 text-dark'>
          <Link to='dsu/home'>
            <span>
              <i
                className='fas fa-arrow-circle-left'
                style={{color: '#81181b', fontSize: '20px', marginRight: '10px', cursor: 'pointer'}}
              ></i>
            </span>
          </Link>
          Ayeza Welcome To The Alumni Portal
        </h1>
      </div>

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : null}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' style={{color: '#80171D'}}>
          Forgot Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn '
          style={{
            backgroundColor: '#80171D',
          }}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && (
            <span className='indicator-label' style={{color: 'white'}}>
              Sign In
            </span>
          )}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' style={{color: '#80171D'}}>
          Create an Account
        </Link>
      </div>
    </form>
  )
}
