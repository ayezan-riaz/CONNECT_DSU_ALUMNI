import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Event1 from '../../../alumni/assets/event1.jpeg'
import Event2 from '../../../alumni/assets/event2.jpeg'
import Event3 from '../../../alumni/assets/event3.jpg'
import './HomeEvents.css'
interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  event_image: string;
}


const HomeEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios.get<Event[]>('https://ams-backend-gkxg.onrender.com/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was a problem fetching the events data:', error);
      });
  }, []);

  // const events: Events[] = [
  //   {
  //     Id: 1,
  //     Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  //     Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  //     Image: Event1,
  //     EventDate: new Date('2023-01-01T00:00:00'),
  //   },
  //   {
  //     Id: 2,
  //     Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  //     Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  //     Image: Event2,
  //     EventDate: new Date('2023-01-01T00:00:00'),
  //   },

  //   {
  //     Id: 3,
  //     Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  //     Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  //     Image: Event3,
  //     EventDate: new Date('2023-01-01T00:00:00'),
  //   },




  // ];
  return (
    <div>
      <div className="row" >
        <div className="position-relative mb-17">
          {/*begin::Overlay*/}
          <div className="overlay overlay-show">
            {/*begin::Image*/}
            <div
              className="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-250px"
              // style={{
              //   backgroundImage: 'url("../../../../../../../app/pages/alumni/assets/ayezan.jpg")'
              // }}
              style={{ backgroundImage: `url(${Event3})` }}
            />
            {/*end::Image*/}
            {/*begin::layer*/}
            <div
              className="overlay-layer rounded bg-black"
              style={{ opacity: "0.4" }}
            />
            {/*end::layer*/}
          </div>
          {/*end::Overlay*/}
          {/*begin::Heading*/}
          <div className="position-absolute text-white mb-8 ms-10 bottom-0">
            {/*begin::Title*/}
            <h3 className="text-white fs-2qx fw-bold mb-3 m">DSU EVENTS</h3>
            {/*end::Title*/}
            {/*begin::Text*/}
            <div className="fs-5 fw-semibold">
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
        <div className="row">
          {events.map((event) => (
            <div key={event.id} className="col-md-4">
              <div className="card-xl-stretch me-md-6">
                <a
                  className="d-block overlay mb-4"
                  data-fslightbox="lightbox-hot-sales"
                  href={event.event_image}
                >
                  <div
                    className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px"
                    style={{ backgroundImage: `url(${event.event_image})` }}
                  />
                  <div className="overlay-layer bg-dark card-rounded bg-opacity-25">
                    <i className="ki-duotone ki-eye fs-2x text-white" />
                  </div>
                  <div className="position-absolute text-white mb-8 ms-10 bottom-0">
                    {/* Add any additional overlay content here */}
                  </div>
                </a>
                <div className="m-0">
                  <a
                    href="../../demo1/dist/pages/user-profile/overview.html"
                    className="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base"
                  >
                    {event.name}
                  </a>
                  <div className="fw-semibold fs-5 text-gray-600 text-dark mt-3 mb-5">
                    {event.description}
                  </div>
                  <div className="fs-6 fw-bold">
                    <span className="text-muted">
                      Event Date: {new Date(event.date).toDateString()}
                    </span>
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