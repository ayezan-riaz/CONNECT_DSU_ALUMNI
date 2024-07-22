/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { KTIcon } from '../../../../../_metronic/helpers'
import moment from 'moment'
import {
  ChartsWidget1,
  ListsWidget5,
  TablesWidget1,
  TablesWidget5,
} from '../../../../../_metronic/partials/widgets'
import { IProfileDetails } from './settings/SettingsModel'
import { profileDetailsInitValues } from './settings/SettingsModel'
import axios from 'axios'
import LoadingScreen from './LoadingScreen/LoadingScreen'

const localid = localStorage.getItem('sub')

export function Overview() {
  const [user, setUsers] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [sub, setSub] = useState<any>('')
  const fetchAcademicsByUserId = async (userId: number) => {
    try {
      const response = await axios.get(`http://13.200.151.68:3000/api/users/${localid}/profile`)
      const userData = response.data
      setUsers(userData)
      console.log(userData.profile)
    } catch (error) {
      console.error(error) // Handle any errors that occur during the request.
    }
  }

  useEffect(() => {
    if (user) {
      fetchAcademicsByUserId(user.id)
      setIsLoading(false)
    }
  }, [])
  // const user = profileDetailsInitValues

  return (
    <>
      {!isLoading && user ? (
        <>
          <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-header cursor-pointer'>
              <div className='card-title m-0'>
                <h3 className='fw-bolder m-0'>Profile Details</h3>
              </div>

              <Link to='/alumni/account/settings' className='btn btn-primary align-self-center'>
                Edit Profile
              </Link>
            </div>

            <div className='card-body p-9'>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {user.first_name + ' ' + user.middle_name + ' ' + user.last_name}
                  </span>
                </div>
              </div>

              {/* <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Father Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{user.ffName +' ' + user.flName}</span>
            </div>
          </div> */}

              {/* <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Gender</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{user.gender}</span>
            </div>
          </div> */}

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Country</label>

                <div className='col-lg-8'>
                  {user.profile && (
                    <span className='fw-bolder fs-6 text-dark'>{user.profile.country}</span>
                  )}
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Email</label>

                <div className='col-lg-8'>
                  <span className='fw-bold fs-6'>{user.email}</span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'> University Email</label>

                <div className='col-lg-8'>
                  <span className='fw-bold fs-6'>{user.uni_email}</span>
                </div>
              </div>

              {/* <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Company</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{user.company}</span>
            </div>
          </div> */}

              {/* <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>CNIC</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{user.CNIC}</span>
            </div>
          </div> */}

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>
                  Contact Phone
                  <i
                    className='fas fa-exclamation-circle ms-1 fs-7'
                    data-bs-toggle='tooltip'
                    title='Phone number must be active'
                  ></i>
                </label>

                <div className='col-lg-8 d-flex align-items-center'>
                  <span className='fw-bolder fs-6 me-2'>{user.phone}</span>

                  <span className='badge badge-success'>Verified</span>
                </div>
              </div>

              {/* <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Blood Group</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{user.Blood}</span>
            </div>
          </div> */}

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>D.O.B</label>

                <div className='col-lg-8 fv-row'>
                  {user.profile && (
                    <span className='fw-bold fs-6'>
                      {moment(user.profile.date_of_birth).format('YYYY-MM-DD')}
                    </span>
                  )}
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Resume</label>

                <div className='col-lg-8 fv-row'>
                  {user?.profile?.resume ? (
                    <>
                      <a
                        href={`http://13.200.151.68:3000/alumni/${user.profile.resume}`}
                        target='_blank'
                        className='fw-bold'
                        rel='noreferrer'
                      >
                        My Resume
                      </a>
                    </>
                  ) : (
                    <span className='text-center'>No File</span>
                  )}
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Communication</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>Email, Phone</span>
                </div>
              </div>

              <div className='row mb-10'>
                <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

                <div className='col-lg-8'>
                  <span className='fw-bold fs-6'>Yes</span>
                </div>
              </div>
            </div>
            {/* <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
            <KTIcon iconName='information-5' className='fs-2tx text-warning me-4' />
            <div className='d-flex flex-stack flex-grow-1'>
              <div className='fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>We need your attention!</h4>
                <div className='fs-6 text-gray-600'>
                  Your payment was declined. To start using tools, please
                  <Link className='fw-bolder' to='/crafted/account/settings'>
                    {' '}
                    Add Payment Method
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div> */}
          </div>

          {/* <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div> */}
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  )
}
