import React from 'react'
import logo from '../../../../assets/logo.png'
const SurveyFilled = () => {

  
  return (
    <div id='container'>
      <div style={{ textAlign: 'center' }}>
        <img
          className='middle'
          alt='DHA Suffa University'
          src={logo}


        />
      </div>
      <br />
      <div id='wrapper'>
        <p className='text-primary text-center fs-5'>

          <br />
          <br />
          Survey Filled ..!
          <br />
          <br />
          Please contact Administrator ( survey.admin@dsu.edu.pk ) for further assistance.
          <br />
          <br />
        </p>
      </div>
    </div>
  )
}

export default SurveyFilled
