import React, { useEffect, useState } from 'react'

import AcademicTable from './tables/AcademicTable'
import CertificationTable from './tables/CertificationTable'


export function Academics() {

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <AcademicTable />
        <CertificationTable/>
        
      </div>
    </>
  )
}
