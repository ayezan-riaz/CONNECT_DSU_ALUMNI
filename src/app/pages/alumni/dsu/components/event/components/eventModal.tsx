import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

interface EventModalProps {
  isOpen: boolean; // Indicates whether the modal is open or closed
  onClose: () => void; // Function to close the modal
  selectedEvent: Event | null; // Selected event to edit or null for adding new event
}
interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  event_image: string;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, selectedEvent }) => {
  const [formData, setFormData] = useState<Event>({
    id: selectedEvent ? selectedEvent.id : -1, // Set a dummy id for new event
    name: selectedEvent ? selectedEvent.name : '',
    description: selectedEvent ? selectedEvent.description : '',
    event_image: selectedEvent ? selectedEvent.event_image : '',
    date: selectedEvent ? selectedEvent.date : '',
  });

  // Update form data when selected event changes
  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        id: selectedEvent.id,
        name: selectedEvent.name,
        description: selectedEvent.description,
        event_image: selectedEvent.event_image,
        date: selectedEvent.date,
      });
    }
  }, [selectedEvent]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim() || !formData.date) {
      toast.error('Please fill in all fields');
      return;
    }

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('description', formData.description);
    formPayload.append('date', formData.date);
    if (formData.event_image) {
      formPayload.append('event_image', formData.event_image as unknown as Blob); // Ensure correct file append
    }

    try {
      if (selectedEvent) {
        await axios.put(`https://ams-backend-gkxg.onrender.com/api/events/${selectedEvent.id}`, formPayload);
        toast.success('Event updated successfully');
      } else {
        await axios.post('https://ams-backend-gkxg.onrender.com/api/events', formPayload);
        toast.success('Event added successfully');
      }
      onClose();
    } catch (error) {
      console.error('Error submitting event:', error);
      toast.error('Failed to submit event');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: Event) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData((prevData: Event) => ({
        ...prevData,
        event_image: file as unknown as string, // Type assertion for image
      }));
    }
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Event Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Event Image</Form.Label>
            <Form.Control
              type="file"
              name="event_image"
              onChange={handleFileChange}
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

export default EventModal;
