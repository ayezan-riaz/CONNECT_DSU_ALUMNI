/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { PasswordMeterComponent } from '../../../../_metronic/assets/ts/components'
import { useAuth } from '../core/Auth'
import { inits } from '../../wizards/components/CreateAccountWizardHelper'
const initialValues = {
  email: '',
  phone: '',
  password: '',
  reg_id: '',
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({

  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  phone: Yup.string()

    .min(3, 'Minimum 9 symbols')
    .max(50, 'Maximum 11 symbols')
    .required('Phone Number is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),


  // changepassword: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Password confirmation is required')
  //   .oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const { data: auth } = await registeruser(
          values.email,
          values.phone,
          values.password,
          values.reg_id,

          //values.last_name
        );

        saveAuth(auth)
        // const { data: user } = await getUserByToken(auth.api_token)
        // setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The registration details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-left mb-11'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Almost Finished</h1>
        {/* end::Title */}

        <div className='text-gray-500 fw-semibold fs-6'>
          Your Email {inits.SentEmail} has been Verified
        </div>
      </div>
      {/* end::Heading */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}
      {/* begin::Form group Email */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}



      {/* begin::Form group first_name */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Phone Number</label>
        <input
          placeholder='Enter Phone Number'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('phone')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.phone && formik.errors.phone,
            },
            {
              'is-valid': formik.touched.phone && !formik.errors.phone,
            }
          )}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.phone}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}



      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
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
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <span>
            I Accept the{' '}
            <a
              href='https://keenthemes.com/metronic/?page=faq'
              target='_blank'
              className='ms-1 btn_brown'
            >
              Terms
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg but_brown w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Form group */}
    </form>
  )
}
function registeruser(email: string, phone: string, password: string, reg_id: string): { data: any } | PromiseLike<{ data: any }> {
  throw new Error('Function not implemented.')
}

