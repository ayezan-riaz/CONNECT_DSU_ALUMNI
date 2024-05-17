import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface NewsModalProps {
  isOpen: boolean; // Indicates whether the modal is open or closed
  onClose: () => void; // Function to close the modal
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    NewsDate: '',
    Image: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.Name.trim() || !formData.Description.trim() || !formData.NewsDate.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Create an object with the form data
    const newsData = {
      Name: formData.Name,
      Description: formData.Description,
      NewsDate: formData.NewsDate,
      Image: formData.Image,
    };

    // Handle the event data as needed (e.g., send it to a server)
    console.log('Event Data:', newsData);

    // Clear the form fields
    setFormData({
      Name: '',
      Description: '',
      NewsDate: '',
      Image: '',
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
        <Modal.Title>Add New News</Modal.Title>
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
            <Form.Label>News Date</Form.Label>
            <Form.Control
              type="date"
              name="NewsDate"
              value={formData.NewsDate}
              onChange={handleChange}
            />
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
            Add News
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export {NewsModal};
