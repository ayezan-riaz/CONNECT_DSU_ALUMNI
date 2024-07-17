import React, {FC} from 'react'
import {KTIcon} from '../../../../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {inits} from '../../../../../../wizards/components/CreateAccountWizardHelper'

const Step5: FC = () => {
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
        <h2 className='fw-bolder text-dark mb-4'>Account Created</h2>
        <p>Your email has been verified, login to complete your profile.</p>

        <Link to='/auth/login'>
          <button className='btn btn-sm me-3' style={{backgroundColor: '#80171D', color: 'white'}}>
            Login Now
          </button>
        </Link>
      </div>
    </div>
  )
}

export {Step5}
