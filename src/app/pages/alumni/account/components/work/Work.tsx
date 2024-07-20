import React, {useState, useEffect} from 'react'
import ModalWork from './ModalWork'
import axios from 'axios'

interface Experience {
  id?: number
  designation: string
  company: string
  status: string
  nature_of_job: string
  start_year: string
  end_year: string
}

const localid = localStorage.getItem('sub')

const Work = () => {
  const [editUser, setEditUser] = useState<any>({})
  const [users, setUsers] = useState<Experience[]>([])

  const fetchExperiencesByUserId = async (userId: number) => {
    try {
      const response = await axios.get(`http://13.200.151.68:3000/api/users/${localid}/experiences`)
      const userData = response.data
      console.log(userData.experiences)

      const newExperiences: Experience[] = userData.experiences.map((experience: any) => {
        const {company, designation, id, nature_of_job, status, start_year, end_year} = experience

        // Create a new experience object
        const newExperience: Experience = {
          id,
          designation,
          company,
          status,
          nature_of_job,
          start_year,
          end_year,
        }

        return newExperience
      })

      console.log(newExperiences)
      setUsers([...newExperiences]) // Assuming you have defined and set the 'setUsers' state elsewhere.
    } catch (error) {
      console.error(error) // Handle any errors that occur during the request.
    }
  }

  useEffect(() => {
    fetchExperiencesByUserId(4)
  }, [])

  const postExperiencesByUserId = async (data: any, userId: number) => {
    try {
      const response = await axios.post(
        `http://13.200.151.68:3000/api/experiences/${localid}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      console.log(response.data) // This will log the response data from the server.
    } catch (error) {
      console.error(error) // Handle any errors that occur during the request.
    }
  }

  const editExperienceByUserId = async (data: Experience, Id: number | undefined) => {
    try {
      console.log(Id)
      const response = await axios.patch(`http://13.200.151.68:3000/api/experiences/${Id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log(response.data) // This will log the response data from the server.
    } catch (error) {
      console.error(error) // Handle any errors that occur during the request.
    }
  }

  const deleteExperiencesByUserId = async (Id: number | undefined) => {
    try {
      console.log(Id)
      const response = await axios.delete(`http://13.200.151.68:3000/api/experiences/${Id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log(response.data) // This will log the response data from the server.
    } catch (error) {
      console.error(error) // Handle any errors that occur during the request.
    }
  }

  const updateExistingUser = (updatedUser: any) => {
    editExperienceByUserId(updatedUser, updatedUser.id)
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === updatedUser.id) {
          return {...user, ...updatedUser}
        }
        return user
      })
    })
  }

  useEffect(() => {
    console.log(users) // Log the users state whenever it changes
  }, [users])

  const handleEditUser = (userId: number | undefined) => {
    // Find the user with the matching id
    const userToUpdate = users.find((user) => user.id === userId)

    if (userToUpdate) {
      console.log(userToUpdate)
      // Perform the edit operation on the user (e.g., open a modal for editing)
      // updateExistingUser(userToUpdate);
      setEditUser(userToUpdate)
      updateExistingUser(userToUpdate)

      setShowModal(true)
    }
  }

  const handleDeleteUser = (userId: number | undefined) => {
    // Filter out the user with the matching id

    const updatedUsers = users.filter((user) => user.id !== userId)
    deleteExperiencesByUserId(userId)
    setUsers(updatedUsers)
    console.log('Delete User:', userId)
  }

  const handleAddUser = (newUser: any) => {
    postExperiencesByUserId(newUser, 4)
    newUser.id = users.length + 1
    setUsers([...users, newUser])
    // console.log('Add User:', newUser);

    // Perform any other actions with the new user data in the parent component
  }

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    // updateExistingUser(editUser)
    setEditUser({})
  }
  return (
    <div className='card'>
      <div className='card-header border-0 pt-6'>
        <div className='card-toolbar'>
          <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            <button type='button' className='btn btn-primary' onClick={openModal}>
              <i className='ki-duotone ki-plus fs-2' />
              Add Work Experience
            </button>
          </div>
        </div>
      </div>
      <div className='card-body py-4'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            role='table'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-30px'
                  style={{cursor: 'pointer'}}
                >
                  S.No.
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-100px'
                  style={{cursor: 'pointer'}}
                >
                  Role
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-100px'
                  style={{cursor: 'pointer'}}
                >
                  Company
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-100px'
                  style={{cursor: 'pointer'}}
                >
                  Status
                </th>

                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-100px'
                  style={{cursor: 'pointer'}}
                >
                  Nature of Job
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-100px'
                  style={{cursor: 'pointer'}}
                >
                  Start Date
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-100px'
                  style={{cursor: 'pointer'}}
                >
                  End Date
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='text-end min-w-100px'
                  style={{cursor: 'pointer'}}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' role='rowgroup'>
              {users.map((user, index) => (
                <tr key={user.id} role='row'>
                  <td role='cell' className=''>
                    {index + 1}
                  </td>
                  <td role='cell' className=''>
                    {user.designation}
                  </td>
                  <td role='cell' className=''>
                    {user.company}
                  </td>
                  <td role='cell' className=''>
                    {user.status}
                  </td>
                  <td role='cell' className=''>
                    {user.nature_of_job}
                  </td>
                  <td role='cell' className=''>
                    {user.start_year}
                  </td>

                  <td role='cell' className=''>
                    {user.end_year}
                  </td>
                  <td role='cell' className='text-end min-w-100px'>
                    <a
                      href='#'
                      className='btn btn-light btn-active-light-primary btn-sm'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      onClick={(e) => {
                        e.preventDefault()
                        handleEditUser(user.id)
                      }}
                    >
                      Edit
                    </a>
                    <a
                      href='#'
                      className='btn btn-light btn-active-light-primary btn-sm'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      onClick={(e) => {
                        e.preventDefault()
                        handleDeleteUser(user.id)
                      }}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <ModalWork
          closeModal={closeModal}
          addUser={handleAddUser}
          editUser={editUser}
          setEditUser={setEditUser}
          updateExistingUser={updateExistingUser}
        />
      )}
    </div>
  )
}

export default Work
