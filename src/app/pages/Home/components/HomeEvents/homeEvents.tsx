import React, {useEffect, useState} from 'react'
import axios from 'axios'
import eventBackground from '../../../../pages/alumni/assets/eventBackground.jpg'
import {Event} from '../../../../pages/alumni/dsu/components/event/components/eventTypes' // Import the common Event type
import './HomeEvents.css'
import {Link} from 'react-router-dom'

const HomeEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const Imageurl = 'https://ams-backend-gkxg.onrender.com/event/'
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
    <div>
      <div className='row'>
        <div className='position-relative mb-17'>
          {/*begin::Overlay*/}
          <div className='overlay overlay-show'>
            {/*begin::Image*/}
            <div
              className='bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-250px'
              // style={{
              //   backgroundImage: 'url("../../../../../../../app/pages/alumni/assets/ayezan.jpg")'
              // }}
              style={{backgroundImage: `url(${eventBackground})`}}
            />
            {/*end::Image*/}
            {/*begin::layer*/}
            <div className='overlay-layer rounded bg-black' style={{opacity: '0.4'}} />
            {/*end::layer*/}
          </div>
          {/*end::Overlay*/}
          {/*begin::Heading*/}
          <div className='position-absolute text-white mb-8 ms-10 bottom-0'>
            {/*begin::Title*/}
            <h3 className='text-white fs-2qx fw-bold mb-3 m'>DSU EVENTS</h3>
            {/*end::Title*/}
            {/*begin::Text*/}
            <div className='fs-5 fw-semibold'>
              You sit down. You stare at your screen. The cursor blinks.
            </div>
            {/*end::Text*/}
          </div>
          {/*end::Heading*/}
        </div>
      </div>
      <div className='row'>
        <h1 className='text-css'>Events</h1>
      </div>

      <div className='container'>
        <div className='row'>
          {events.map((event) => (
            <div key={event.id} className='col-md-4' style={{marginTop: '20px'}}>
              <div className='card-xl-stretch me-md-6'>
                <a href='#' className='d-block overlay mb-4' data-fslightbox='lightbox-hot-sales'>
                  <div
                    className='overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px'
                    style={{
                      backgroundImage: `url(${Imageurl}${event.event_images[0]})`,
                    }}
                  />

                  <div className='overlay-layer bg-dark card-rounded bg-opacity-25'>
                    <i className='ki-duotone ki-eye fs-2x text-white' />
                  </div>
                  <div className='position-absolute text-white mb-8 ms-10 bottom-0'></div>
                </a>

                <div className='m-0'>
                  {/* <a
                    href="../../demo1/dist/pages/user-profile/overview.html"
                    className="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base"
                  >
                    {event.name}
                  </a> */}
                  <Link to={`/dsu/eventDetail/${event.id}`} style={{textDecoration: 'none'}}>
                    <div className='fs-4 text-dark fw-bold text-hover-primary text-dark lh-base'>
                      {event.name}
                    </div>
                  </Link>
                  <div className='fw-semibold fs-5 text-gray-600 text-dark mt-3 mb-5'>
                    {truncateDescription(event.description, 100)}{' '}
                    {/* Adjust the length as needed */}
                  </div>
                  <div className='fs-6 fw-bold'>
                    <span className='text-muted'>{new Date(event.date).toDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeEvents
