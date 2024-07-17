import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'
import eventBackground from '../../../../../../../app/pages/alumni/assets/eventBackground.jpg'
import EventModal from './eventModal'
import {Event} from './eventTypes'
import './event.css'
import {Link} from 'react-router-dom'

const ViewEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const Imageurl = 'https://ams-backend-gkxg.onrender.com/api/event/'
  const roleId = parseInt(localStorage.getItem('role') || '0', 10)

  const fetchEvents = () => {
    axios
      .get<Event[]>('https://ams-backend-gkxg.onrender.com/api/events')
      .then((response) => {
        setEvents(response.data)
      })
      .catch((error) => {
        console.error('There was a problem fetching the events data:', error)
      })
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const openModal = (event: Event | null) => {
    setSelectedEvent(event)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleDeleteConfirmation = () => {
    if (selectedEvent) {
      axios
        .delete(`https://ams-backend-gkxg.onrender.com/api/events/${selectedEvent.id}`)
        .then(() => {
          setEvents(events.filter((e) => e.id !== selectedEvent.id))
          setDeleteConfirmation(false)
          setSelectedEvent(null)
        })
        .catch((error) => {
          console.error('There was a problem deleting the event:', error)
        })
    }
  }

  const handleDelete = (event: Event) => {
    setSelectedEvent(event)
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
              Add new Event
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
              <h3 className='text-white fs-2qx fw-bold mb-3'>DSU EVENTS</h3>
              <div className='fs-5 fw-semibold'>
                You sit down. You stare at your screen. The cursor blinks.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        {events.map((event) => (
          <div key={event.id} className='col-md-4 mb-4 my-5'>
            <div className='card h-100 shadow-md'>
              {roleId === 1 && (
                <span style={{position: 'absolute', top: '10px', right: '10px', zIndex: 1}}>
                  <i
                    className='fa fa-times-circle'
                    style={{fontSize: '20px', color: '#80171d', cursor: 'pointer'}}
                    onClick={() => handleDelete(event)}
                  ></i>
                </span>
              )}
              <Link to={`/alumni/dsu/eventDetail/${event.id}`} className='d-block overlay mb-4'>
                <div
                  className='card-img-top'
                  style={{
                    height: '200px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage:
                      event.event_images.length > 0
                        ? `url(${Imageurl}${event.event_images[0]})`
                        : 'url(/path/to/placeholder-image.jpg)',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                />
              </Link>
              <div className='card-body d-flex flex-column'>
                <h5 className='card-title'>{event.name}</h5>
                <p className='card-text'>{truncateDescription(event.description, 100)}</p>
                <p className='card-text'>
                  <small className='text-muted'>{new Date(event.date).toDateString()}</small>
                </p>
                {roleId === 1 && (
                  <div className='mt-auto'>
                    <Button
                      variant='primary'
                      size='sm'
                      className='me-1'
                      onClick={() => openModal(event)}
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

      <EventModal
        isOpen={showModal}
        onClose={closeModal}
        selectedEvent={selectedEvent}
        fetchEvents={fetchEvents}
      />

      <Modal show={deleteConfirmation} onHide={() => setDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
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

export default ViewEvent
