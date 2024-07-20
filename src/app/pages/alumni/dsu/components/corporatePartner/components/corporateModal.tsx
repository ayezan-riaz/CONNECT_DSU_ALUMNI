import React, {useEffect, useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {toast} from 'react-toastify'
import axios, {AxiosError} from 'axios'
import {CorporatePartner} from './corporatePartner' // Import the common CorporatePartner type

interface CorporateModalProps {
  isOpen: boolean
  onClose: () => void
  selectedCorporate: CorporatePartner | null
  fetchCorporates: () => void
}

const CorporateModal: React.FC<CorporateModalProps> = ({
  isOpen,
  onClose,
  selectedCorporate,
  fetchCorporates,
}) => {
  const [formData, setFormData] = useState<CorporatePartner>({
    id: -1,
    name: '',
    discounted_offer: '',
    valid_date: '',
    image: '',
  })

  const [currentImage, setCurrentImage] = useState<string | null>(null)

  useEffect(() => {
    if (selectedCorporate) {
      axios
        .get(`http://13.200.151.68:3000/api/corporate-partners/${selectedCorporate.id}`)
        .then((response) => {
          const corporateData = response.data
          setFormData({
            id: corporateData.id,
            name: corporateData.name,
            discounted_offer: corporateData.discounted_offer,
            valid_date: corporateData.valid_date.split('T')[0],
            image: '', // Do not pre-fill image for edit
          })
          setCurrentImage(corporateData.image)
        })
        .catch((error) => {
          console.error('Error fetching corporate partner details:', error)
          toast.error('Failed to fetch corporate partner details')
        })
    } else {
      setFormData({
        id: -1,
        name: '',
        discounted_offer: '',
        valid_date: '',
        image: '',
      })
      setCurrentImage(null)
    }
  }, [selectedCorporate, isOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.discounted_offer.trim() || !formData.valid_date) {
      toast.error('Please fill in all fields')
      return
    }

    const payload = new FormData()
    payload.append('name', formData.name)
    payload.append('discounted_offer', formData.discounted_offer)
    payload.append('valid_date', formData.valid_date)

    if (typeof formData.image !== 'string' && formData.image.length > 0) {
      ;(formData.image as File[]).forEach((file) => {
        payload.append('image', file)
      })
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    try {
      if (selectedCorporate) {
        await axios.patch(
          `http://13.200.151.68:3000/api/corporate-partners/${selectedCorporate.id}`,
          payload,
          {
            headers,
          }
        )
        toast.success('Corporate partner updated successfully')
      } else {
        await axios.post('http://13.200.151.68:3000/api/corporate-partners', payload, {
          headers,
        })
        toast.success('Corporate partner added successfully')
      }
      fetchCorporates()
      onClose()
    } catch (err) {
      const error = err as AxiosError
      console.error(
        'Error submitting corporate partner:',
        error.response ? error.response.data : error.message
      )
      toast.error('Failed to submit corporate partner')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData((prevData) => ({
        ...prevData,
        image: files,
      }))
    }
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedCorporate ? 'Edit Corporate Partner' : 'Add New Corporate Partner'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter name'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Discounted Offer</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name='discounted_offer'
              value={formData.discounted_offer}
              onChange={handleChange}
              placeholder='Enter discounted offer'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Valid Date</Form.Label>
            <Form.Control
              type='date'
              name='valid_date'
              value={formData.valid_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='file' name='image' onChange={handleFileChange} multiple />
            {currentImage && (
              <div className='mt-2'>
                <span>Current Image: {currentImage}</span>
                <div>
                  <img
                    src={`http://13.200.151.68:3000/api/corporate-partners/${currentImage}`}
                    alt='Current'
                    style={{maxHeight: '100px', marginTop: '10px'}}
                  />
                </div>
              </div>
            )}
          </Form.Group>
          <Button variant='primary' type='submit'>
            {selectedCorporate ? 'Update Corporate Partner' : 'Add Corporate Partner'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CorporateModal
