import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react'
import eventBackground from '../../../../../../../app/pages/alumni/assets/eventBackground.jpg'
import {EventModal} from './eventModal'; // Import the EventModal component
import './event.css'
interface Events {
  Id: number;
  Name: string;
  Description: string;
  Image: string;
  EventDate: Date; // Use Date instead of DateTime
}


const ViewEvent:React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null); // Track the selected event
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // Track delete confirmation


  // Function to open the modal
  const openModal = (event: Events | null) => {
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
  console.log('Deleting event with ID:', selectedEvent?.Id);

  // Close the confirmation modal
  setDeleteConfirmation(false);
  // Clear the selected event
  setSelectedEvent(null);
};

// Function to handle delete action
const handleDelete = (event: Events) => {
  setSelectedEvent(event);
  setDeleteConfirmation(true);
};

  const events: Events[] = [
{
  Id: 1,
  Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  Image: eventBackground,
  EventDate: new Date('2023-01-01T00:00:00'),
},
{
  Id: 2,
  Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  Image: eventBackground,
  EventDate: new Date('2023-01-01T00:00:00'),
},

{
  Id: 3,
  Name: 'Admin Panel - How To Started the Dashboard Tutorial',
  Description: 'We’ve been focused on making a the from also not been afraid to and step away been focused create eye',
  Image:eventBackground,
  EventDate: new Date('2023-01-01T00:00:00'),
},




  ];
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
      style={{backgroundImage: `url(${eventBackground})`}}
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
  {events.map((event, index) => (
    <div key={index} className="col-md-4">
      <div className="card-xl-stretch me-md-6">
      <span style={{ textAlign: 'right' }}>
                <i className="fa fa-times-circle" style={{ fontSize: '20px', color: '#80171d', cursor: 'pointer' }} onClick={() => handleDelete(event)}></i>
              </span>
        <a
          className="d-block overlay mb-4"
          data-fslightbox="lightbox-hot-sales"
          href={event.Image}
        >
          <div
            className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px"
            style={{ backgroundImage: `url(${event.Image})` }}
          />
          <div className="overlay-layer bg-dark card-rounded bg-opacity-25">
          
            <i className="ki-duotone ki-eye fs-2x text-white" />
          </div>
          <div className="position-absolute text-white mb-8 ms-10 bottom-0">
 

    {/*end::Text*/}
  </div>
        </a>
        <div className="m-0">
          <a
            href="../../demo1/dist/pages/user-profile/overview.html"
            className="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base"
          >
            {event.Name}
          </a>
{/* Edit icon */}
<span style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => openModal(event)}>
                    <i className="fa fa-pencil" style={{ fontSize: '15px', color: '#80171d' }}></i>
                  </span>

          <div className="fw-semibold fs-5 text-gray-600 text-dark mt-3 mb-5">
            {event.Description}
          </div>
          <div className="fs-6 fw-bold">
            <span className="text-muted">Event Date: {event.EventDate.toDateString()}</span>
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