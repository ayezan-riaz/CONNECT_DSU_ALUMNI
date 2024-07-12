import React, {FC} from 'react'
import {KTIcon} from '../../../../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {inits} from '../../../../../../wizards/components/CreateAccountWizardHelper'

const Step5: FC = () => {
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
        <h2 className='fw-bolder text-dark mb-4'>Your Account Has Been Created</h2>
        <p>
          Your Email<span> </span>
          <br /> has been verified Login and complete your profile to become a part of ourl alumni
          community
        </p>
        <a
          href='/auth/login'
          type='submit'
          className='btn btn-lg me-3'
          style={{backgroundColor: '#80171D', color: 'white'}}
          target='_blank'
        >
          Head To Login
        </a>
      </div>
    </div>
  )
}

export {Step5}
