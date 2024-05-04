import {useState, useEffect} from 'react'
import React from 'react'
import SkillsModal from './SkillsModal'
import YourForm from './SkillsModal'

import {useQuery, useMutation} from 'react-query'
import axios from 'axios'
import LoadingScreen from '../../LoadingScreen/LoadingScreen'


const localid=localStorage.getItem('sub');
   
const SkillsTable = () => {
  const [users, setUsers] = useState<any[]>([])
 
  const [isLoading, setIsLoading] = useState(true)

  const fetchSkillsByUserId = async (userId: number) => {
    try {
      const response = await axios.get(`https://amsbackend-ghub.onrender.com/skills/user/${localid}`)
      const userData = response.data
      console.log(userData)
      const modifiedUsers = userData.map((user: any) => {
        const extractedTags = extractTags(user.tags)
        return {...user, tags: extractedTags}
      })
      // setUsers(modifiedUsers)

      setUsers([...modifiedUsers]) // Assuming you have defined and set the 'setUsers' state elsewhere.
    } catch (error) {
      console.error(error) // Handle any errors that occur during the request.
    }
  }

 

  const uploadFile = async (userId: number, crt: { certificate: File }): Promise<any> => {
    try {
      console.log(crt, userId);

      const formData = new FormData();
      formData.append('file', crt.certificate);

      const response = await axios.post(
        `https://amsbackend-ghub.onrender.com/skills/${userId}/uploadCertificate`,
        formData

      );

      const data = response.data;
      console.log(data);

      return data;
  } catch (error) {
    console.error(error);
    // Rethrow the error to be handled by the caller.
  }
  };

  const addSkill = async (skillData: any) => {
    try {
      const response = await axios.post(
        `https://amsbackend-ghub.onrender.com/skills/${localid}`,
        skillData,
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

  const deleteSkill = async (userId: number) => {
    try {
      const response = await axios.delete(`https://amsbackend-ghub.onrender.com/skills/${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error('Failed to delete user.')
    }
  }

  const editSkill = async (updatedUser: any) => {
    try {
      console.log(updatedUser)
      const extractedTags = updatedUser.tags.map((item: any) => item.value).join(' ')
      const upUser = {...updatedUser, tags: extractedTags}

      const response = await axios.patch(
        `https://amsbackend-ghub.onrender.com/skills/${updatedUser.id}`,
        upUser,
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

  const [editUser, setEditUser] = useState<any>({
    // tags: [],
  })

  const extractTags = (tags: string) => {
    if (tags) {
      const tagArray = tags.split(' ').map((tag) => {
        return {label: tag, value: tag}
      })
      return tagArray
    }
    return []
  }
  useEffect(() => {
    if (users) {
      
      fetchSkillsByUserId(4)
      setIsLoading(false)
    }
  }, [])

  const updateExistingUser = async (updatedUser: any, crt: any) => {
    console.log(updatedUser)
    await editSkill(updatedUser)
    if (crt.certificate) {
      console.log(crt.certificate)

      const n = crt.certificate.name
      const fileExtension = n.split('.').pop()
      console.log(fileExtension)
      const s = '4/skillCertificates/' + updatedUser.id + '.' + fileExtension

      const upUser = {...updatedUser, certificate: s}
      // const upUser = {...updatedUser, certificate: s}
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
    if (!isLoading && users) {
      console.log(users)
    }

    // Log the users state whenever it changes
  }, [users])

  const handleEditUser = (userId: number) => {
    console.log(userId)

    const userToUpdate = users.find((user) => user.id === userId)
    console.log(userToUpdate)
    if (userToUpdate) {
      // Set the user to be edited in the state
      console.log(userToUpdate)
      setEditUser(userToUpdate)

      // Perform the edit operation using the editUserMutation
      setShowModal(true)

      // Show the modal for editing
    }
  }

  const handleDeleteUser = (skillId: number) => {
    // Filter out the user with the matching id
    const updatedUsers = users.filter((user) => user.id !== skillId)
    setUsers(updatedUsers)
    deleteSkill(skillId)
    // console.log('Delete User:', userId)
  }

  const handleAddUser = async (newUser: any, crt: any) => {
    const data = await addSkill(newUser)

    const extractedTags = extractTags(newUser.tags)

    if (crt.certificate) {
      console.log(crt.certificate.name)
      const n = crt.certificate.name
      const fileExtension = n.split('.').pop()
      console.log(fileExtension)
      const s = '4/skillCertificates/' + data.id + '.' + fileExtension
      console.log(s)
      let upUser = {...data, tags: extractedTags, certificate: s}

      setUsers([...users, upUser])

      const data2 = await uploadFile(data.id, crt)
    } else {
      let upUser = {...data, tags: extractedTags, id: data.id}

      setUsers([...users, upUser])
    }

    console.log(users)
  }

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    setEditUser({})
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>My SkillSet</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Add Skills as you progress</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          data-bs-original-title='Click to add a user'
          data-kt-initialized={1}
        >
          <a href='#' className='btn btn-sm btn-light btn-active-primary ' onClick={openModal}>
            <i className='ki-duotone ki-plus fs-2' />
            Add new Skill
          </a>
        </div>
        {showModal && (
          <YourForm
            closeModal={handleClose}
            addUser={handleAddUser}
            editUser={editUser}
            setEditUser={setEditUser}
            updateExistingUser={updateExistingUser}
          />
        )}
      </div>

      <div className='card-body py-3'>
        {/*begin::Table container*/}
        <div className='table-responsive'>
          {/*begin::Table*/}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/*begin::Table head*/}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-150px'>Skill Category</th>
                <th className='min-w-150px'>Skill Name</th>
                <th className='min-w-160px'>Tags</th>
                <th className='min-w-100px'>Scale</th>
                <th className='min-w-80px '>Certified</th>
                <th className='min-w-150px text-center'>Image</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/*end::Table head*/}
            {/*begin::Table body*/}
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <i className='fa-solid fa-screwdriver-wrench'></i>
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {user.category}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.sub_category && (
                      <>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {user.sub_category}
                        </a>
                      </>
                    )}
                  </td>

                  <td>
                    {user.tags &&
                      user.tags.map((tag: any) => (
                        <span className='badge badge-secondary fw-semibold me-1'>{tag.value}</span>
                      ))}
                    {/* <span className='badge badge-secondary fw-semibold me-1'>{user.tags}</span> */}
                    {/* <div>hello</div> */}
                  </td>

                  <td style={{width: '100px'}}>
                    <div className='d-flex flex-column me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-bold'>{user.level}</span>
                      </div>
                      <div className='progress h-6px '>
                        <div
                          className='progress-bar bg-primary'
                          role='progressbar'
                          style={{width: `${user.level}%`}}
                          aria-valuenow={user.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </td>

                  {/* <td className='text-center pe-5'>{user.certificate}</td> */}

                  <td className='text-center'>
                    {user.has_certificate ? <span>Yes</span> : <span>No</span>}

        
                  </td>

                

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
                    <td className='text-center'>No File</td>
                  )}

                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href=''
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i
                          className='ki-duotone ki-pencil fs-2'
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            handleEditUser(user.id)
                          }}
                        >
                          <span className='path1' />
                          <span className='path2' />
                        </i>
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <i
                          className='ki-duotone ki-trash fs-2'
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            handleDeleteUser(user.id)
                          }}
                        >
                          <span className='path1' />
                          <span className='path2' />
                          <span className='path3' />
                          <span className='path4' />
                          <span className='path5' />
                        </i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*end::Table*/}
        </div>
        {/*end::Table container*/}
      </div>
    </>
  )
}

export default SkillsTable

