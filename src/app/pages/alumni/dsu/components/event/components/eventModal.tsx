import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface EventModalProps {
  isOpen: boolean; // Indicates whether the modal is open or closed
  onClose: () => void; // Function to close the modal
  selectedEvent: Events | null; // Selected event to edit or null for adding new event
}
interface Events {
  Id: number;
  Name: string;
  Description: string;
  Image: string;
  EventDate: Date;
}

const EventModal: React.FC<EventModalProps> =  ({ isOpen, onClose, selectedEvent }) => {
  // const [formData, setFormData] = useState({
  //   Name: '',
  //   Description: '',
  //   EventDate: '',
  //   Image: '',
  // });
  const [formData, setFormData] = useState<Events>({
    Id: selectedEvent ? selectedEvent.Id : -1, // Set a dummy Id for new event
    Name: selectedEvent ? selectedEvent.Name : '',
    Description: selectedEvent ? selectedEvent.Description : '',
    Image: selectedEvent ? selectedEvent.Image : '',
    EventDate: selectedEvent ? selectedEvent.EventDate : new Date(),
  });

    // Update form data when selected event changes
    useEffect(() => {
      if (selectedEvent) {
        setFormData({
          Id: selectedEvent.Id,
          Name: selectedEvent.Name,
          Description: selectedEvent.Description,
          Image: selectedEvent.Image,
          EventDate: selectedEvent.EventDate,
        });
      }
    }, [selectedEvent]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
   // Basic form validation
    if (!formData.Name.trim() || !formData.Description.trim() || !formData.EventDate) {
      toast.error('Please fill in all fields');
      return;
    }


    // Create an object with the form data
    const eventData = {
      Name: formData.Name,
      Description: formData.Description,
      EventDate: formData.EventDate,
      Image: formData.Image,
    };

    // Handle the event data as needed (e.g., send it to a server)
    console.log('Event Data:', eventData);

    // Clear the form fields
    setFormData({
      Id: -1, // Set a dummy Id for new event
      Name: '',
      Description: '',
      Image: '',
      EventDate: new Date(),
    });

    // Close the modal
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedEvent ? 'Edit Event' : 'Add New Event'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Event Date</Form.Label>
            <Form.Control type="date" name="EventDate" value={formData.EventDate.toISOString().slice(0, 10)} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="Image"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prevData) => ({
                  ...prevData,
                  Image: e.target.files ? e.target.files[0].name : '',
                }))
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {selectedEvent ? 'Update Event' : 'Add Event'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export {EventModal};
