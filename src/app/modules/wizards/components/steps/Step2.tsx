import React, {FC} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import { ErrorMessage, Field } from 'formik'
import { inits } from '../CreateAccountWizardHelper'

const Step2: FC = () => {
  return (
    <div className='w-100' style={{textAlign: 'center'}}>
      <div
        className='text-gray-400 fw-bold fs-6 mb-0'
        style={{display: 'flex', justifyContent: 'flex-end'}}
      >
        Having Issues?
        <a href='/auth/login' className='fw-bolder' style={{color: '#80171D'}}>
          Get Help
        </a>
      </div>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-4'>Verify Your Email</h2>
        <p>
          We have sent an Email <span> {inits.SentEmail}</span>
          <br /> Please follow the link to verify your Email.
        </p>
        <a
          href='https://mail.dsu.edu.pk/'
          type='submit'
          className='btn btn-lg me-3'
          style={{backgroundColor: '#80171D', color: 'white'}}
        >
          Visit Email
        </a>
      </div>
    </div>
  )
}

export {Step2}
