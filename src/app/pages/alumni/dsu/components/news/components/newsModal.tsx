import React, {useEffect, useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {toast} from 'react-toastify'
import axios, {AxiosError} from 'axios'
import {News} from './newsTypes' // Import the common News type

interface NewsModalProps {
  isOpen: boolean
  onClose: () => void
  selectedNews: News | null
  fetchNews: () => void
}

const NewsModal: React.FC<NewsModalProps> = ({isOpen, onClose, selectedNews, fetchNews}) => {
  const [formData, setFormData] = useState<News>({
    id: -1,
    name: '',
    description: '',
    news_image: '',
    date: '',
  })

  useEffect(() => {
    if (selectedNews) {
      axios
        .get(`http://13.200.151.68:3000/api/news/${selectedNews.id}`)
        .then((response) => {
          const newsData = response.data
          setFormData({
            id: newsData.id,
            name: newsData.name,
            description: newsData.description,
            news_image: '', // Do not pre-fill News images for edit
            date: newsData.date.split('T')[0],
          })
        })
        .catch((error) => {
          console.error('Error fetching News details:', error)
          toast.error('Failed to fetch News details')
        })
    } else {
      setFormData({
        id: -1,
        name: '',
        description: '',
        news_image: '',
        date: '',
      })
    }
  }, [selectedNews, isOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.description.trim() || !formData.date) {
      toast.error('Please fill in all fields')
      return
    }

    let payload: any
    let headers

    if (selectedNews) {
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

      if (typeof formData.news_image !== 'string') {
        formData.news_image.forEach((file) => {
          payload.append('news_image', file)
        })
      }
      headers = {
        'Content-Type': 'multipart/form-data',
      }
    }

    try {
      if (selectedNews) {
        await axios.patch(`http://13.200.151.68:3000/api/news/${selectedNews.id}`, payload, {
          headers,
        })
        toast.success('News updated successfully')
      } else {
        await axios.post('http://13.200.151.68:3000/api/news', payload, {
          headers,
        })
        toast.success('News added successfully')
      }
      fetchNews()
      onClose()
    } catch (err) {
      const error = err as AxiosError
      console.error('Error submitting News:', error.response ? error.response.data : error.message)
      toast.error('Failed to submit News')
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
        news_image: files,
      }))
    }
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedNews ? 'Edit News' : 'Add News'}</Modal.Title>
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
            <Form.Label>News Date</Form.Label>
            <Form.Control type='date' name='date' value={formData.date} onChange={handleChange} />
          </Form.Group>
          {!selectedNews && (
            <Form.Group className='mb-3'>
              <Form.Label>News Images</Form.Label>
              <Form.Control type='file' name='news_image' onChange={handleFileChange} multiple />
            </Form.Group>
          )}
          <Button variant='primary' type='submit'>
            {selectedNews ? 'Update News' : 'Add News'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default NewsModal
