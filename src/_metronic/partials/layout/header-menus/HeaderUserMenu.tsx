/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'

const HeaderUserMenu: FC = () => {
  const {logout} = useAuth()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
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
