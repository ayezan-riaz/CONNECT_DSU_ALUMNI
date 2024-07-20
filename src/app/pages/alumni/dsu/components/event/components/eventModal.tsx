import React, {useEffect, useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {toast} from 'react-toastify'
import axios, {AxiosError} from 'axios'
import {Event} from './eventTypes' // Import the common Event type

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  selectedEvent: Event | null
  fetchEvents: () => void
}

const EventModal: React.FC<EventModalProps> = ({isOpen, onClose, selectedEvent, fetchEvents}) => {
  const [formData, setFormData] = useState<Event>({
    id: -1,
    name: '',
    description: '',
    event_images: '',
    date: '',
  })

  useEffect(() => {
    if (selectedEvent) {
      axios
        .get(`http://13.200.151.68:3000/api/events/${selectedEvent.id}`)
        .then((response) => {
          const eventData = response.data
          setFormData({
            id: eventData.id,
            name: eventData.name,
            description: eventData.description,
            event_images: '', // Do not pre-fill event images for edit
            date: eventData.date.split('T')[0],
          })
        })
        .catch((error) => {
          console.error('Error fetching event details:', error)
          toast.error('Failed to fetch event details')
        })
    } else {
      setFormData({
        id: -1,
        name: '',
        description: '',
        event_images: '',
        date: '',
      })
    }
  }, [selectedEvent, isOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.description.trim() || !formData.date) {
      toast.error('Please fill in all fields')
      return
    }

    let payload: any
    let headers

    if (selectedEvent) {
      payload = JSON.stringify({
        name: formData.name,
        description: formData.description,
        date: formData.date,
      })
      headers = {
        'Content-Type': 'application/json',
      }
    } else {
      payload = new FormData()
      payload.append('name', formData.name)
      payload.append('description', formData.description)
      payload.append('date', formData.date)

      if (typeof formData.event_images !== 'string') {
        formData.event_images.forEach((file) => {
          payload.append('event_images', file)
        })
      }
      headers = {
        'Content-Type': 'multipart/form-data',
      }
    }

    try {
      if (selectedEvent) {
        await axios.patch(`http://13.200.151.68:3000/api/events/${selectedEvent.id}`, payload, {
          headers,
        })
        toast.success('Event updated successfully')
      } else {
        await axios.post('http://13.200.151.68:3000/api/events', payload, {
          headers,
        })
        toast.success('Event added successfully')
      }
      fetchEvents()
      onClose()
    } catch (err) {
      const error = err as AxiosError
      console.error('Error submitting event:', error.response ? error.response.data : error.message)
      toast.error('Failed to submit event')
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
      if (files.length > 10) {
        toast.error('You can only upload a maximum of 10 images')
        return
      }
      setFormData((prevData) => ({
        ...prevData,
        event_images: files,
      }))
    }
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedEvent ? 'Edit Event' : 'Add New Event'}</Modal.Title>
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
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter description'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Event Date</Form.Label>
            <Form.Control type='date' name='date' value={formData.date} onChange={handleChange} />
          </Form.Group>
          {!selectedEvent && (
            <Form.Group className='mb-3'>
              <Form.Label>Event Images</Form.Label>
              <Form.Control type='file' name='event_images' onChange={handleFileChange} multiple />
            </Form.Group>
          )}
          <Button variant='primary' type='submit'>
            {selectedEvent ? 'Update Event' : 'Add Event'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EventModal
