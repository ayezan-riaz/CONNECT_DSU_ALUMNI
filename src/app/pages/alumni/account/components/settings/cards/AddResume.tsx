/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {Form, Button} from 'react-bootstrap'

const localId = localStorage.getItem('sub')

const AddResume: React.FC = () => {
  const [fileData, setFileData] = useState<File | null>(null)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (fileData) {
      const payload = new FormData()
      payload.append('file', fileData)

      axios
        .post(
          `https://ams-backend-gkxg.onrender.com/api/profiles/${localId}/uploadResume`,
          payload,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {
          toast.success('New Resume Added', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'colored',
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error('Cannot Add Resume, Try Again', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
        })
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    setFileData(file)
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Add Resume</h3>
        </div>
      </div>
      <div className='card-body border-top p-9'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>Resume</Form.Label>
            <Form.Control
              type='file'
              accept='application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              name='profilePic'
              onChange={handleFileChange}
            />
          </Form.Group>
          <div className='d-flex pt-3 justify-content-end'>
            <Button variant='primary' type='submit'>
              Add Resume
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export {AddResume}
