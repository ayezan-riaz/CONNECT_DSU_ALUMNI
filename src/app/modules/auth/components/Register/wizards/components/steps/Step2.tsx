import React, {FC} from 'react'
//import { KTIcon } from '../../../_metronic/helpers'
import {KTIcon} from '../../../../../../../../_metronic/helpers'
import {ErrorMessage, Field} from 'formik'
import {inits} from '../CreateAccountWizardHelper'

const Step2: FC = () => {
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
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-4'>Verify Your Email</h2>
        <p>Please visit your DSU Mail to verify your email</p>
        <a
          href='https://mail.dsu.edu.pk/'
          type='submit'
          className='btn btn-sm me-3'
          style={{backgroundColor: '#80171D', color: 'white'}}
          target='_blank'
          rel='noreferrer'
        >
          Visit Email
        </a>
      </div>
    </div>
  )
}

export {Step2}
