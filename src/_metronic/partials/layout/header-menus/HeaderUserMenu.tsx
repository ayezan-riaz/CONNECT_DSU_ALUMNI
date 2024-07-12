/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'
import {useEffect, useState} from 'react'
import axios from 'axios'
import DefaultImage from '../../../../app/pages/alumni/assets/ayezan.jpg'
const localid = localStorage.getItem('sub')

const HeaderUserMenu: FC = () => {
  const [img, setImg] = useState<string>('')
  const fetchAcademicsByUserId = async () => {
    try {
      const response = await axios.get(
        `https://ams-backend-gkxg.onrender.com/api/users/${localid}/profile`
      )
      const userData = response.data
      setImg(userData.avatar)
      console.log(userData.avatar)
    } catch (error) {
      console.error(error) // Handle any errors that occur during the request.
    }
  }

  useEffect(() => {
    fetchAcademicsByUserId()
  }, [])

  const {currentUser, logout} = useAuth()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            {/* <img src={`https://ams-backend-gkxg.onrender.com/api/alumni/${img}`} alt='logo' /> */}
            <img src={img || DefaultImage} alt='Metronic' />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.first_name} {currentUser?.first_name}
              {/* <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span> */}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/alumni/account/overview'} className='menu-link px-5'>
          My Profile
        </Link>
      </div>

      <div className='separator my-2'></div>

      {/* <Languages /> */}

      <div className='menu-item px-5 my-1'>
        <Link to='/alumni/account/settings' className='menu-link px-5'>
          Account Settings
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
