import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Event } from '../../../../pages/alumni/dsu/components/event/components/eventTypes'
const Imageurl = 'http://13.200.151.68:3000/api/event/'
const HomeEventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get<Event>(`http://13.200.151.68:3000/events/${id}`)
        .then((response) => {
          setEvent(response.data)
          console.log('response.data', response.data)
        })
        .catch((error) => {
          console.error('There was a problem fetching the event data:', error)
        })
    }
  }, [id])

  if (!event) {
    return <div>Loading...</div>
  }

  const renderImages = () => {
    debugger
    if (typeof event.event_images === 'string') {
      // If event_images is a single string, display it
      return (
        <div className='col-md-4'>
          <img src={`${Imageurl}${event.event_images}`} alt='Event' className='img-fluid' />
        </div>
      )
    } else if (Array.isArray(event.event_images)) {
      // If event_images is an array, map through and display each image
      return event.event_images.map((image, index) => (
        <div key={index} className='col-md-4'>
          <img src={`${Imageurl}${image}`} alt={`Event ${index + 1}`} className='img-fluid' />
        </div>
      ))
    }
    return null
  }

  return (
    <div className="card" style={{ borderRadius: '10px', overflow: 'hidden' }}>
      <div className="card-body">
        <h1 className="card-title">{event.name}</h1>
        <p className="card-text">{event.description}</p>
      </div>
      <div className="card-img-top">
        <div className="row">
          {renderImages()}
        </div>
      </div>
    </div>
  )
}

export default HomeEventDetail
