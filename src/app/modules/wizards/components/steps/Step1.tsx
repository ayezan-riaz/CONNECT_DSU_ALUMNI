import React, {FC} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import {ErrorMessage, Field} from 'formik'

const Step1: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-10'>

      <div className='text-gray-400 fw-bold fs-6 ' style={{ display: 'flex', justifyContent: 'flex-end'}}>
        Having Issues?  
          <a href='/auth/login' className=' fw-bolder' style={{ color: '#80171D' }}>
            {' '}
              Get Help  </a>
          
        </div>


        <h2 className='fw-bolder d-flex align-items-center text-dark'>
        Create Alumni Account
          
        </h2>

        <div className='text-gray-400 fw-bold fs-6'>
        Already have an Account?  
          <a href='/auth/login' className=' fw-bolder' style={{ color: '#80171D' }}>
            {' '}
             Sign In  </a>
          
        </div>
      </div>


      <div className='mb-10 fv-row'>
        <label className='form-label mb-3'>Registration Id</label>

        <Field
          type='text'
          className='form-control form-control-lg form-control-solid'
          name='registrationId'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='registrationId' />
        </div>
      </div>


    </div>
  )
}

export {Step1}
