import React, { useEffect, useState } from 'react'
import axios from 'axios'
import eventBackground from '../../../../pages/alumni/assets/eventBackground.jpg'
import { Event } from '../../../../pages/alumni/dsu/components/event/components/eventTypes' // Import the common Event type
import './HomeEvents.css'
import { Link } from 'react-router-dom'

const HomeEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const Imageurl = 'https://ams-backend-gkxg.onrender.com/api/event/'
  const fetchEvents = () => {
    axios
      .get<Event[]>('https://ams-backend-gkxg.onrender.com/api/events')
      .then((response) => {
        debugger
        setEvents(response.data)
        console.log('Event', response.data)
        console.log('Event', response.data[0].event_images[0])
      })
      .catch((error) => {
        console.error('There was a problem fetching the events data:', error)
      })
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const truncateDescription = (description: string, length: number) => {
    if (description.length <= length) {
      return description
    }
    return description.slice(0, length) + '...'
  }

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-12">
          <div
            className="position-relative"
            style={{
              backgroundImage: `url(${eventBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '250px',
              borderRadius: '10px',
            }}
          >
            <div
              className="overlay-layer rounded bg-black"
              style={{ opacity: '0.4', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '10px' }}
            />
            <div className="position-absolute text-white mb-8 ms-10 bottom-0">
              <h3 className="text-white fs-2qx fw-bold mb-3">DSU EVENTS</h3>
              <div className="fs-5 fw-semibold">
                You sit down. You stare at your screen. The cursor blinks.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">

              <Link to={`/alumni/dsu/eventDetail/${event.id}`} className="d-block overlay mb-4">
                <div
                  className="card-img-top"
                  style={{
                    height: '200px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: event.event_images.length > 0
                      ? `url(${Imageurl}${event.event_images[0]})`
                      : 'url(/path/to/placeholder-image.jpg)',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px'
                  }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{truncateDescription(event.description, 100)}</p>
                <p className="card-text"><small className="text-muted">{new Date(event.date).toDateString()}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default HomeEvents
