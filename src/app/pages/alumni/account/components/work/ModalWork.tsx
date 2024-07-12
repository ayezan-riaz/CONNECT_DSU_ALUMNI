import {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Option from '../Option'

interface TestProps {
  closeModal: () => void
  addUser: (newUser: any) => void
  editUser: any

  setEditUser: (user: any) => void
  updateExistingUser: (user: any) => void
}

function ModalWork({closeModal, addUser, editUser, setEditUser, updateExistingUser}: TestProps) {
  const [formData, setFormData] = useState(editUser)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editUser.id) {
      // Perform update operation with the formData for the existing user
      const updatedUser = {
        ...editUser,
        designation: formData.designation,
        company: formData.company,
        status: formData.status,
        nature_of_job: formData.nature_of_job,
        start_year: formData.start_year,
        end_year: formData.end_year,
      }

      console.log(updatedUser)
      setEditUser(updatedUser)
      updateExistingUser(updatedUser)
      // Example: updateExistingUser(updatedUser);

      // Reset the editUser state
    } else {
      // Perform add operation with the formData for the new user
      const newUser = {
        designation: formData.designation,
        company: formData.company,
        status: formData.status || 'Temporary',
        nature_of_job: formData.nature_of_job || 'Federal Government',
        start_year: formData.start_year,
        end_year: formData.end_year,
      }
      addUser(newUser)
    }

    // Reset the form data and close the modal
    setFormData({
      designation: '',
      company: '',
      status: '',
      nature_of_job: '',
      start_year: '',
      end_year: '',
    })
    closeModal()
  }

  return (
    <>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Work Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Designation</Form.Label>
              <Form.Control
                required
                type='text'
                name='designation'
                value={formData.designation}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label> Company</Form.Label>
              <Form.Control
                type='text'
                value={formData.company}
                name='company'
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId='nature_of_job'>
              <Form.Label>Nature of Job </Form.Label>
              <Form.Select
                className='form-select form-select-solid mb-3'
                name='nature_of_job'
                value={formData.nature_of_job}
                onChange={handleChange}
                required
              >
                <option value={'Federal Government'}>Federal Government</option>
                <option value={'Provincial Government'}>Provincial Government</option>
                <option value={'Armed Forces'}>Armed Forces</option>
                <option value={'Semi Government'}>Semi Government</option>
                <option value={'Private'}>Private</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId='status'>
              <Form.Label>Job Status</Form.Label>
              <Form.Select
                className='form-select form-select-solid mb-2'
                name='status'
                value={formData.status}
                onChange={handleChange}
                required
              >
                <Option val={'Temporary'} />
                <Option val={'Officiating'} />
                <Option val={'Contract'} />
                <Option val={'Ad-Hoc'} />
                <Option val={'Daily Wages'} />
                <Option val={'Honorary'} />
                <Option val={'Part Time'} />
                <Option val={'Apprentice'} />
                <Option val={'Permanent'} />
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Post Starting Date</Form.Label>
              <Form.Control
                type='date'
                value={formData.start_year}
                name='start_year'
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='mb-2' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Post Ending Date</Form.Label>
              <Form.Control
                type='date'
                value={formData.end_year}
                name='end_year'
                onChange={handleChange}
              />
            </Form.Group>

            <div className=' text-center'>
              <Button type='submit' className='btn btn-primary me-2 mt-2'>
                {editUser.id ? 'Update User' : 'Add User'}
                {/* Save Changes */}
              </Button>
              <Button className='btn btn-secondary mt-2 ' onClick={closeModal}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalWork
