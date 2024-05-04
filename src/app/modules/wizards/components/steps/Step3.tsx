import React, {FC} from 'react'
import {Field, ErrorMessage} from 'formik'
import { Registration } from '../../../auth/components/Registration'
const Step3: FC = () => {
  return (
    <div className='w-100'>
      <div className='text-gray-400 fw-bold fs-6 mb-0' style={{ display: 'flex', justifyContent: 'flex-end' }}>
    Having Issues?  
    <a href='/auth/login' className='fw-bolder' style={{ color: '#80171D' }}>
      Get Help
    </a>
  </div>
      <Registration />


    </div>
  )
}

export {Step3}
