import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'
import eventBackground from '../../../../../../../app/pages/alumni/assets/eventBackground.jpg'
import NewsModal from './newsModal' // Import the NewsModal component
import {News} from './newsTypes' // Import the common News type
import './news.css'
import {Link} from 'react-router-dom'

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<News[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedNews, setSelectedNews] = useState<News | null>(null) // Track the selected event
  const [deleteConfirmation, setDeleteConfirmation] = useState(false) // Track delete confirmation
  const Imageurl = 'https://ams-backend-gkxg.onrender.com/api/news/'
  const fetchNews = () => {
    axios
      .get<News[]>('https://ams-backend-gkxg.onrender.com/api/news')
      .then((response) => {
        debugger
        setNews(response.data)
        console.log('News', response.data)
        console.log('News', response.data[0].news_image[0])
      })
      .catch((error) => {
        console.error('There was a problem fetching the events data:', error)
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
        .delete(`https://ams-backend-gkxg.onrender.com/api/news/${selectedNews.id}`)
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
    <div>
      <div className='row mb-5'>
        <div className='col-lg-2 col-md-2 col-sm-6 offset-md-10 offset-lg-10 offset-sm-6'>
          <button className='btn btn-primary des' onClick={() => openModal(null)}>
            Add new News
          </button>
        </div>
      </div>
      <div className='row'>
        <div className='position-relative mb-17'>
          <div className='overlay overlay-show'>
            <div
              className='bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-250px'
              style={{backgroundImage: `url(${eventBackground})`}}
            />
            <div className='overlay-layer rounded bg-black' style={{opacity: '0.4'}} />
          </div>
          <div className='position-absolute text-white mb-8 ms-10 bottom-0'>
            <h3 className='text-white fs-2qx fw-bold mb-3 m'>DSU NEWS</h3>
            <div className='fs-5 fw-semibold'>
              You sit down. You stare at your screen. The cursor blinks.
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        {news.map((newss) => (
          <div key={newss.id} className='col-md-4'>
            <div className='card-xl-stretch me-md-6'>
              <span style={{textAlign: 'right'}}>
                <i
                  className='fa fa-times-circle'
                  style={{fontSize: '20px', color: '#80171d', cursor: 'pointer'}}
                  onClick={() => handleDelete(newss)}
                ></i>
              </span>

              <a href='#' className='d-block overlay mb-4' data-fslightbox='lightbox-hot-sales'>
                <div
                  className='overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px'
                  style={{
                    backgroundImage: `url(${Imageurl}${newss.news_image[0]})`,
                  }}
                />

                <div className='overlay-layer bg-dark card-rounded bg-opacity-25'>
                  <i className='ki-duotone ki-eye fs-2x text-white' />
                </div>
                <div className='position-absolute text-white mb-8 ms-10 bottom-0'></div>
              </a>

              <div className='m-0'>
                <Link to={`/alumni/dsu/newsDetail/${newss.id}`} style={{textDecoration: 'none'}}>
                  <div className='fs-4 text-dark fw-bold text-hover-primary text-dark lh-base'>
                    {newss.name}
                  </div>
                </Link>
                <span
                  style={{marginLeft: '10px', cursor: 'pointer'}}
                  onClick={() => openModal(newss)}
                >
                  <i className='fa fa-pencil' style={{fontSize: '15px', color: '#80171d'}}></i>
                </span>
                <div className='fw-semibold fs-5 text-gray-600 text-dark mt-3 mb-5'>
                  {truncateDescription(newss.description, 100)} {/* Adjust the length as needed */}
                </div>
                <div className='fs-6 fw-bold'>
                  <span className='text-muted'>{new Date(newss.date).toDateString()}</span>
                </div>
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
