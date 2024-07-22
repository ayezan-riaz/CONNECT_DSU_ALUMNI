import React, {FC} from 'react'
import {KTIcon} from '../../../../../../../../_metronic/helpers'
import {ErrorMessage, Field} from 'formik'
import {Link} from 'react-router-dom'

const Step1: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-10'>
        <div
          className='text-gray-400 fw-bold fs-6 '
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

        <h2 className='fw-bolder d-flex align-items-center text-dark'>Create Alumni Account</h2>

        <div className='text-gray-400 fw-bold fs-6'>
          Already have an Account?
          <Link to='/auth/login'>
            <button className=' fw-bolder' style={{color: '#80171D', marginLeft:'9px', border:'2px solid white'}}>
              &nbsp;Sign In
            </button>
          </Link>
        </div>
      </div>

      <div className='mb-10 fv-row'>
        <label className='form-label mb-3'>Registration ID</label>

        <Field
          type='text'
          className='form-control form-control-lg form-control-solid'
          name='uni_reg_id'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='uni_reg_id' />
        </div>
      </div>
    </div>
  )
}

export {Step1}
