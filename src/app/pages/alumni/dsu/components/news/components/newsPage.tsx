import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
import eventBackground from '../../../../../../../app/pages/alumni/assets/new1.png'
import NewsModal from './newsModal' // Import the NewsModal component
import { News } from './newsTypes' // Import the common News type
import './news.css'
import { Link } from 'react-router-dom'

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<News[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedNews, setSelectedNews] = useState<News | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const Imageurl = 'http://13.200.151.68:3000/news/'
  const roleId = parseInt(localStorage.getItem('role') || '0', 10)

  const fetchNews = () => {
    axios
      .get<News[]>('http://13.200.151.68:3000/api/news')
      .then((response) => {
        setNews(response.data)
      })
      .catch((error) => {
        console.error('There was a problem fetching the news data:', error)
      })
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const openModal = (news: News | null) => {
    setSelectedNews(news)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleDeleteConfirmation = () => {
    if (selectedNews) {
      axios
        .delete(`http://13.200.151.68:3000/api/news/${selectedNews.id}`)
        .then(() => {
          setNews(news.filter((e) => e.id !== selectedNews.id))
          setDeleteConfirmation(false)
          setSelectedNews(null)
        })
        .catch((error) => {
          console.error('There was a problem deleting the news:', error)
        })
    }
  }

  const handleDelete = (news: News) => {
    setSelectedNews(news)
    setDeleteConfirmation(true)
  }

  const truncateDescription = (description: string, length: number) => {
    if (description.length <= length) {
      return description
    }
    return description.slice(0, length) + '...'
  }

  return (
    <div className='container'>
      {roleId === 1 && (
        <div className='row mb-5'>
          <div className='col-2 offset-10'>
            <button className='btn btn-primary des' onClick={() => openModal(null)}>
              Add new News
            </button>
          </div>
        </div>
      )}
      <div className='row mb-5'>
        <div className='col-12'>
          <div
            className='position-relative'
            style={{
              backgroundImage: `url(${eventBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '250px',
              borderRadius: '10px',
            }}
          >
            <div
              className='overlay-layer rounded bg-black'
              style={{
                opacity: '0.4',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '10px',
              }}
            />
            <div className='position-absolute text-white mb-8 ms-10 bottom-0'>
              <h3 className='text-white fs-2qx fw-bold mb-3'>DSU NEWS</h3>
              <div className='fs-5 fw-semibold'>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        {news.map((newss) => (
          <div key={newss.id} className='col-md-4 mb-4'>
            <div className='card h-100 shadow-sm'>
              {roleId === 1 && (
                <span style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
                  <i
                    className='fa fa-times-circle'
                    style={{ fontSize: '20px', color: '#80171d', cursor: 'pointer' }}
                    onClick={() => handleDelete(newss)}
                  ></i>
                </span>
              )}
              <Link to={`/alumni/dsu/newsDetail/${newss.id}`} className='d-block overlay mb-4'>
                <div
                  className='card-img-top'
                  style={{
                    height: '200px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage:
                      newss.news_image.length > 0
                        ? `url(${Imageurl}${newss.news_image[0]})`
                        : 'url(/path/to/placeholder-image.jpg)',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                />
              </Link>
              <div className='card-body d-flex flex-column'>
                <h5 className='card-title'>{newss.name}</h5>
                <p className='card-text'>{truncateDescription(newss.description, 100)}</p>
                <p className='card-text'>
                  <small className='text-muted'>{new Date(newss.date).toDateString()}</small>
                </p>
                {roleId === 1 && (
                  <div className='mt-auto'>
                    <Button
                      variant='primary'
                      size='sm'
                      className='me-1'
                      onClick={() => openModal(newss)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <NewsModal
        isOpen={showModal}
        onClose={closeModal}
        selectedNews={selectedNews}
        fetchNews={fetchNews}
      />

      <Modal show={deleteConfirmation} onHide={() => setDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this news?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setDeleteConfirmation(false)}>
            No
          </Button>
          <Button variant='primary' onClick={handleDeleteConfirmation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default NewsPage
