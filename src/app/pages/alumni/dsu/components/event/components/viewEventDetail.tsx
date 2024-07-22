import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Event} from './eventTypes'

const ViewEventDetail: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get<Event>(`http://13.200.151.68:3000/api/events/${id}`)
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
    if (typeof event.event_images === 'string') {
      // If event_images is a single string, display it
      return (
        <div className='col-md-4'>
          <img
            src={`http://13.200.151.68:3000/event/${event.event_images}`}
            alt='Event'
            className=''
          />
        </div>
      )
    } else if (Array.isArray(event.event_images)) {
      // If event_images is an array, map through and display each image
      return event.event_images.map((image, index) => (
        <div key={index} className='col-lg-4 col-md-12 mb-4 mb-lg-0'>
          <img
            src={`http://13.200.151.68:3000/event/${image}`}
            alt={`Event ${index + 1}`}
            className='w-100 shadow-1-strong rounded mb-4'
          />
        </div>
      ))
    }
    return null
  }

  return (
    <div className='card' style={{borderRadius: '10px', overflow: 'hidden'}}>
      <div className='card-body'>
        <h1 className='card-title'>{event.name}</h1>
        <p className='card-text'>{event.description}</p>
      </div>
      <div className='card-footer container'>
        <div className='row row-gap-4'>{renderImages()}</div>
      </div>
    </div>
  )
}

export default ViewEventDetail
