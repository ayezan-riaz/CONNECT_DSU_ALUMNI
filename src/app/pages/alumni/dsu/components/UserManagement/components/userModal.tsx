import React, {useEffect, useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {toast} from 'react-toastify'
import axios, {AxiosError} from 'axios'
import {Users} from './usersTypes' // Import the Users type

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  selectedUser: Users | null
  fetchUsers: () => void
  isAdmin: boolean // Add isAdmin prop
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  selectedUser,
  fetchUsers,
  isAdmin,
}) => {
  const [formData, setFormData] = useState<Users>({
    id: -1,
    email: '',
    uni_email: '',
    phone: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    password: '',
    role: 0,
    registration_status: 0,
    active_status: false,
    avatar: '',
    password_reset_token: '',
  })

  const [registrationData, setRegistrationData] = useState({
    uni_email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    qualification: '',
    area: '',
    registration_time: '',
    graduation_time: '',
    cgpa: 0,
  })

  useEffect(() => {
    if (selectedUser) {
      axios
        .get(`http://13.200.151.68:3000/api/users/${selectedUser.id}`)
        .then((response) => {
          const userData = response.data
          setFormData({
            id: userData.id,
            email: userData.email,
            uni_email: userData.uni_email,
            phone: userData.phone,
            first_name: userData.first_name,
            middle_name: userData.middle_name,
            last_name: userData.last_name,
            password: '', // Do not pre-fill password for security reasons
            role: userData.role,
            registration_status: userData.registration_status,
            active_status: userData.active_status,
            avatar: '', // Do not pre-fill avatar for edit
            password_reset_token: userData.password_reset_token,
          })
        })
        .catch((error) => {
          console.error('Error fetching user details:', error)
          toast.error('Failed to fetch user details')
        })
    } else {
      setFormData({
        id: -1,
        email: '',
        uni_email: '',
        phone: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        password: '',
        role: 0,
        registration_status: 0,
        active_status: false,
        avatar: '',
        password_reset_token: '',
      })
      setRegistrationData({
        uni_email: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        qualification: '',
        area: '',
        registration_time: '',
        graduation_time: '',
        cgpa: 0,
      })
    }
  }, [selectedUser, isOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.email.trim() || !formData.first_name.trim() || !formData.last_name.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    const payload = new FormData()
    payload.append('email', formData.email)
    payload.append('uni_email', formData.uni_email)
    payload.append('phone', formData.phone)
    payload.append('first_name', formData.first_name)
    payload.append('middle_name', formData.middle_name)
    payload.append('last_name', formData.last_name)
    payload.append('password', formData.password)

    if (typeof formData.avatar !== 'string') {
      payload.append('avatar', formData.avatar) // Only append the first file
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    try {
      if (selectedUser) {
        await axios.patch(`http://13.200.151.68:3000/api/users/${selectedUser.id}`, payload, {
          headers,
        })
        toast.success(isAdmin ? 'Admin updated successfully' : 'User updated successfully')
      } else {
        const endpoint = isAdmin
          ? 'http://13.200.151.68:3000/api/users/admin'
          : 'http://13.200.151.68:3000/api/registrations'
        const finalPayload = isAdmin ? payload : registrationData
        await axios.post(endpoint, finalPayload, {headers})
        toast.success(isAdmin ? 'Admin added successfully' : 'User added successfully')
      }
      fetchUsers()
      onClose()
    } catch (err) {
      const error = err as AxiosError
      console.error('Error submitting user:', error.response ? error.response.data : error.message)
      toast.error('Failed to submit user')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    if (isAdmin || selectedUser) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    } else {
      setRegistrationData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0] // Only select the first file
      setFormData((prevData) => ({
        ...prevData,
        avatar: file,
      }))
    }
  }

  const modalTitle = selectedUser
    ? isAdmin
      ? 'Edit Admin'
      : 'Edit User'
    : isAdmin
    ? 'Add New Admin'
    : 'Add New User'
  const submitButtonText = selectedUser
    ? isAdmin
      ? 'Update Admin'
      : 'Update User'
    : isAdmin
    ? 'Add Admin'
    : 'Add User'

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {isAdmin || selectedUser ? (
            <>
              <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter email'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>University Email</Form.Label>
                <Form.Control
                  type='email'
                  name='uni_email'
                  value={formData.uni_email}
                  onChange={handleChange}
                  placeholder='Enter university email'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Enter phone number'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  name='first_name'
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder='Enter first name'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type='text'
                  name='middle_name'
                  value={formData.middle_name}
                  onChange={handleChange}
                  placeholder='Enter middle name'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  name='last_name'
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder='Enter last name'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter password'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Avatar</Form.Label>
                <Form.Control type='file' name='avatar' onChange={handleFileChange} />
                {selectedUser && (
                  <div>
                    <img
                      src={`http://13.200.151.68:3000/alumni/${selectedUser.avatar}`}
                      alt='Current Avatar'
                      style={{maxHeight: '100px', marginTop: '10px'}}
                    />
                  </div>
                )}
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className='mb-3'>
                <Form.Label>University Email</Form.Label>
                <Form.Control
                  type='email'
                  name='uni_email'
                  value={registrationData.uni_email}
                  onChange={handleChange}
                  placeholder='Enter university email'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  name='first_name'
                  value={registrationData.first_name}
                  onChange={handleChange}
                  placeholder='Enter first name'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type='text'
                  name='middle_name'
                  value={registrationData.middle_name}
                  onChange={handleChange}
                  placeholder='Enter middle name'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  name='last_name'
                  value={registrationData.last_name}
                  onChange={handleChange}
                  placeholder='Enter last name'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  type='text'
                  name='qualification'
                  value={registrationData.qualification}
                  onChange={handleChange}
                  placeholder='Enter qualification'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Area</Form.Label>
                <Form.Control
                  type='text'
                  name='area'
                  value={registrationData.area}
                  onChange={handleChange}
                  placeholder='Enter area'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Registration Time</Form.Label>
                <Form.Control
                  type='text'
                  name='registration_time'
                  value={registrationData.registration_time}
                  onChange={handleChange}
                  placeholder='Enter registration time'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Graduation Time</Form.Label>
                <Form.Control
                  type='text'
                  name='graduation_time'
                  value={registrationData.graduation_time}
                  onChange={handleChange}
                  placeholder='Enter graduation time'
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>CGPA</Form.Label>
                <Form.Control
                  type='number'
                  name='cgpa'
                  value={registrationData.cgpa}
                  onChange={handleChange}
                  placeholder='Enter CGPA'
                  step='0.01'
                  required
                />
              </Form.Group>
            </>
          )}
          <Button variant='primary' type='submit'>
            {submitButtonText}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default UserModal
