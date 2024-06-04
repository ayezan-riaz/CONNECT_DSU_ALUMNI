import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
// import React, { useState } from 'react'
import eventBackground from '../../../../../../../app/pages/alumni/assets/eventBackground.jpg'
import EventModal from './eventModal'; // Import the EventModal component
import Event1 from '../../../../assets/event1.jpeg'
import Event2 from '../../../../assets/event2.jpeg'
import Event3 from '../../../../assets/event3.jpg'
import './event.css'

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  event_image: string;
}


const ViewEvent: React.FC = () => {

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


  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // Track the selected event
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // Track delete confirmation


  // Function to open the modal
  const openModal = (event: Event | null) => {
    setSelectedEvent(event);
    setShowModal(true);
  };
  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };
  // Function to handle delete confirmation
  const handleDeleteConfirmation = () => {
    // Perform delete action here, e.g., call a delete API
    console.log('Deleting event with ID:', selectedEvent?.id);

    // Close the confirmation modal
    setDeleteConfirmation(false);
    // Clear the selected event
    setSelectedEvent(null);
  };

  // Function to handle delete action
  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setDeleteConfirmation(true);
  };

  return (
    <div>
      <div className="row mb-5">
        <div className="col-lg-2  col-md-2 col-sm-6 offset-md-10 offset-lg-10 offset-sm-6">
          <button className="btn btn-primary des" onClick={() => openModal(null)}>
            Add new Event
          </button>
          {/* <button className="btn btn-primary des" onClick={openModal} 
> Add new Event</button> */}
        </div>
      </div>
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
              style={{ backgroundImage: `url(${eventBackground})` }}
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

      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-4">
            <div className="card-xl-stretch me-md-6">
              <span style={{ textAlign: 'right' }}>
                <i className="fa fa-times-circle" style={{ fontSize: '20px', color: '#80171d', cursor: 'pointer' }} onClick={() => handleDelete(event)}></i>
              </span>
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
                {/* Edit icon */}
                <span style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => openModal(event)}>
                  <i className="fa fa-pencil" style={{ fontSize: '15px', color: '#80171d' }}></i>
                </span>
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

      {/* Render the EventModal */}
      <EventModal isOpen={showModal} onClose={closeModal} selectedEvent={selectedEvent} />
      {/* Confirmation Modal */}
      <Modal show={deleteConfirmation} onHide={() => setDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmation(false)}>No</Button>
          <Button variant="primary" onClick={handleDeleteConfirmation}>Yes</Button>
        </Modal.Footer>
      </Modal>
      {/* <script type="module" src="https://unpkg.com/@splinetool/viewer@1.3.7/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/6vWTQIXXYAkaAk-2/scene.splinecode"></spline-viewer> */}
    </div>
  )
}

export default ViewEvent