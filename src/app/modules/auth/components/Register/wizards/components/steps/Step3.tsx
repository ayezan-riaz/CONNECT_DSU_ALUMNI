import React, {useContext} from 'react'
import {Field, ErrorMessage} from 'formik'
import {useState} from 'react'

import {CGPAContext} from '../Vertical'

export function Step3() {
  const [showPassword, setShowPassword] = useState(false)

  const step2data = useContext(CGPAContext)

  return (
    <div className='w-100'>
      <div
        className='text-gray-400 fw-bold fs-6 mb-0'
        style={{display: 'flex', justifyContent: 'flex-end'}}
      >
        Having Issues?
        <a
          href='https://www.dsu.edu.pk/contact-us/'
          target='_blank'
          rel='noreferrer'
          className='fw-bolder'
          style={{color: '#80171D'}}
        >
          &nbsp;Get Help
        </a>
      </div>
      <div className='container ' style={{marginTop: 20}}>
        <div className='row'>
          <div className='mb-10 col-4 '>
            <label className='form-label mb-3'>First Name</label>

            <Field
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='first_name'
              value={step2data.step2First_name !== null ? step2data.step2First_name : ''}
              readOnly
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='first_name' />
            </div>
          </div>
          <div className='mb-10 col-4'>
            <label className='form-label mb-3'>Middle Name</label>

            <Field
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='first_name'
              value={step2data.step2Middle_name !== null ? step2data.step2Middle_name : ''}
              readOnly
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='first_name' />
            </div>
          </div>
          <div className='mb-10 col-4'>
            <label className='form-label mb-3'>Last Name</label>

            <Field
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='last_name'
              value={step2data.step2Last_name !== null ? step2data.step2Last_name : ''}
              readOnly
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='first_name' />
            </div>
          </div>
          <div className='mb-10 col-12'>
            <label className='form-label mb-3'>University Email</label>

            <Field
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='first_name'
              value={step2data.step2Uni_email !== null ? step2data.step2Uni_email : ''}
              readOnly
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='first_name' />
            </div>
          </div>
          <div className='mb-10 col-4 '>
            <label className='form-label mb-3'>Qualification</label>

            <Field
              type='text'
              className='form-control form-control-lg form-control-solid'
              value={step2data.step2Qulification !== null ? step2data.step2Qulification : ''}
              readOnly
              name='Qualification'
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='first_name' />
            </div>
          </div>
          <div className='mb-10 col-4'>
            <label className='form-label mb-3'>Area</label>

            <Field
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='first_name'
              value={step2data.step2Area !== null ? step2data.step2Area : ''}
              readOnly
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='first_name' />
            </div>
          </div>
          <div className='mb-10 col-4'>
            <label className='form-label mb-3'>CGPA</label>
            {/* Display the CGPA value received from the Context */}
            <Field
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='cgpa'
              value={step2data.step2Cgpa !== null ? step2data.step2Cgpa : ''}
              readOnly
            />
          </div>
          <div className='mb-10 fv-row'>
            <label className='form-label mb-3'>Email</label>

            <Field
              type='email'
              className='form-control form-control-lg form-control-solid'
              name='email'
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='email' />
            </div>
          </div>
          <div className='mb-10 fv-row'>
            <label className='form-label mb-3'>Phone</label>

            <Field
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='phone'
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='phone' />
            </div>
          </div>

          <div className='mb-10 fv-row'>
            <label className='form-label mb-3'>Password</label>

            <div className='position-relative'>
              <Field
                type={showPassword ? 'text' : 'password'}
                className='form-control form-control-lg form-control-solid'
                name='password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='btn btn-sm btn-icon btn-active-color-primary position-absolute top-50 end-0 translate-middle-y'
                style={{zIndex: '99'}}
              >
                {showPassword ? (
                  <i className='bi bi-eye-slash' style={{color: 'black'}}></i>
                ) : (
                  <i className='bi bi-eye' style={{color: 'black'}}></i>
                )}
              </button>
            </div>

            <div className='text-danger mt-2'>
              <ErrorMessage name='password' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
