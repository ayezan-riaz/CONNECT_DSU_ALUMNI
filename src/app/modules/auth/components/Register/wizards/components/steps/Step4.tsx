import React, {FC} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../../../../_metronic/helpers'
//import { KTIcon } from '../../../../../../../../_metronic/helpers'
import {ErrorMessage, Field} from 'formik'
import {inits} from '../CreateAccountWizardHelper'

const Step4: FC = () => {
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
        <p>
          {localStorage.getItem('p_mail')
            ? 'Mail sent to ' + localStorage.getItem('p_mail') + ', please verify your email'
            : 'Mail sent, please verify your email'}
        </p>
      </div>
    </div>
  )
}

export {Step4}
