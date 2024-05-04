import React from 'react'
import {useState, useEffect} from 'react'
import {AcademicModal} from '../AcademicModal'
import axios from 'axios'
import LoadingScreen from '../../LoadingScreen/LoadingScreen'
import moment from 'moment'



const localid=localStorage.getItem('sub');


const AcademicTable = () => {
  const [showModal, setShowModal] = useState(false)

  const [users, setUsers] = useState<any[]>([])

  const [editUser, setEditUser] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)



  const fetchAcademicsByUserId = async (userId: number) => {
    try {
      const response = await axios.get(
        `https://amsbackend-ghub.onrender.com/academics/user/${localid}`
      )
      const userData = response.data     
      console.log(userData,localid)
      const filteredUsers: any[] = [];
      userData.forEach((user:any) => {
        console.log(user)
        if (user.qualification_type === 'Degree') {
          filteredUsers.push(user)
        }
      })
      setUsers([...filteredUsers]);
    } catch (error) {
      console.error(error) // Handle any errors that occur during the request.
    }
  }

 

  const uploadFile = async (userId: number, crt: {certificate: File}): Promise<any> => {
    try {
      console.log(crt, userId)

      const formData = new FormData()
      formData.append('file', crt.certificate)

      const response = await axios.post(
        `https://amsbackend-ghub.onrender.com/academics/${userId}/uploadCertificate`,
        formData
      )

      const data = response.data
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
      // Rethrow the error to be handled by the caller.
    }
  }

  const addAcademic = async (academicData: any) => {
    try {
      const response = await axios.post(
        `https://amsbackend-ghub.onrender.com/academics/${localid}`,
        academicData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (error) {
      console.error(error)
      // Handle any errors that occur during the request.
    }
  }

  const deleteAcademic = async (userId: number) => {
    try {
      const response = await axios.delete(`https://amsbackend-ghub.onrender.com/academics/${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error('Failed to delete user.')
    }
  }

  const editAcademic = async (updatedUser: any) => {
    try {
      console.log(updatedUser)
    

      const response = await axios.patch(
        `https://amsbackend-ghub.onrender.com/academics/${updatedUser.id}`,
        updatedUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (error) {
      console.error(error)
      // Handle any errors that occur during the request.
    }
  }











  const updateExistingUser = async (updatedUser: any, crt: any) => {
    console.log(updatedUser)
    await editAcademic(updatedUser)
    if (crt.certificate) {
      console.log(crt.certificate)

      const n = crt.certificate.name
      const fileExtension = n.split('.').pop()
      console.log(fileExtension)
      const s = '4/academicCertificates/' + updatedUser.id + '.' + fileExtension

      const upUser = {...updatedUser, certificate: s}
    
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user.id === updatedUser.id) {
            return upUser
          }
          return user
        })
      })
      await uploadFile(updatedUser.id, crt)
    }
else{
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser
        }
        return user
      })
    })
  }


  }

 


  

  useEffect(() => {
    if (users) {
      fetchAcademicsByUserId(4)
      setIsLoading(false)
    }
  }, [])
  const handleEditUser = (userId: number) => {
    // Find the user with the matching id
    const userToUpdate = users.find((user) => user.id === userId)

    if (userToUpdate) {
      console.log(userToUpdate)
      // Perform the edit operation on the user (e.g., open a modal for editing)
     // updateExistingUser(userToUpdate)

      setEditUser(userToUpdate)

      setShowModal(true)
      console.log(userToUpdate)
    }
  }

  const handleDeleteUser = (userId: number) => {
    // Filter out the user with the matching id
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)
    deleteAcademic(userId)
    console.log('Delete User:', userId)
  }

  const handleAddUser = async (newUser: any, crt: any) => {
    let tryUser = {...newUser}
    console.log(tryUser)
    const data = await addAcademic(tryUser)
    if (crt.certificate) {
      console.log(crt.certificate.name)
      const n = crt.certificate.name
      const fileExtension = n.split('.').pop()
      console.log(fileExtension)
      const s = '4/academicCertificates/' + data.id + '.' + fileExtension
      console.log(s)
      let upUser = {...data, certificate: s}

      setUsers([...users, upUser])

      const data2 = await uploadFile(data.id, crt)
    } else {
      let upUser = {...data, id: data.id}

      setUsers([...users, upUser])
    }
    console.log(crt)
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditUser({})
  }

  if(isLoading){
  return <LoadingScreen/>
  }
  
  return (
    <>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Academics</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Add degrees </span>
        </h3>

        <div className='card-toolbar'>
          <a href='#' className='btn btn-sm btn-light-primary' onClick={openModal}>
            <i className='ki-duotone ki-plus fs-2' />
            Add New Academic Record
          </a>

        
        </div>
      </div>
      <div className='card-body py-3'>
        <span className='card-label fs-3'>Degrees</span>

        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4 mt-2'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-155px rounded-start'> Qualification</th>
                <th className='min-w-115px'>Area</th>
                <th className='min-w-130px'>Institute</th>
                <th className='min-w-120px'>Location</th>
                <th className='min-w-115px'>Duration</th>
                <th className='min-w-115px'>Score</th> 
                <th className='min-w-120px'>Status</th>
                <th className='min-w-120px'>Reference</th>
                <th className='min-w-115px '>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                 
                    <>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div
                            className='symbol symbol-35px symbol-circle ms-3 me-2'
                            data-bs-toggle='tooltip'
                          >
                            <span className='symbol-label bg-secondary text-inverse-warning fw-bold'>
                              {user.qualification && user.qualification.charAt(0)}
                            </span>
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <a
                              href='#'
                              className='text-danger fw-bold text-hover-primary mb-1 fs-6'
                            >
                              {user.qualification}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a
                          href='#'
                          className='text-danger fw-bold text-hover-primary d-block mb-1 fs-6'
                        >
                          {user.area}
                        </a>
                      </td>
                    </>
                
                    
            

                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      {user.institute}
                    </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      {user.institute_address}
                    </a>
                  </td>
                  <td> {moment(user.start_year).format('YYYY-MM-DD')}--{moment(user.end_year).format('YYYY-MM-DD')}</td>

                 <td>{user.score}</td> 

                  <td>
                    <span className='badge badge-success fs-7 fw-bold'>{user.status} </span>
                  </td>
                  <td className='text-center'>
                    {user.certificate ? (
                      <>
                        <a
                          href={`https://amsbackend-ghub.onrender.com/alumni/${user.certificate}`}
                          target='_blank'
                        >
                          {user.certificate}
                        </a>
                        {/* <td className='text-center'>{user.certificate}</td> */}
                      </>
                    ) : (
                      <span className='text-center'>No File</span>
                    )}
                  </td>

                  <td role='cell' className=' min-w-100px'>
                    <a
                      href='#'
                      className='btn btn-light btn-active-light-primary btn-sm'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      onClick={() => handleEditUser(user.id)}
                    >
                      Edit
                    </a>
                    <a
                      href='#'
                      className='btn btn-light btn-active-light-primary btn-sm'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* end::Table */}
        </div>
        {showModal &&  (
          <AcademicModal
            heading='Academic'
            closeModal={closeModal}
            addUser={handleAddUser}
            editUser={editUser}
            setEditUser={setEditUser}
            updateExistingUser={updateExistingUser}
          />
      
        )
       
    }
      </div>
    </>
  )
}

export default AcademicTable
