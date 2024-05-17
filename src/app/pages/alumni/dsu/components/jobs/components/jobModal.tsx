



import React, { ChangeEvent, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface JobModalProps {
  isOpen: boolean; // Indicates whether the modal is open or closed
  onClose: () => void; // Function to close the modal
}

const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    Name: '',
    jobTitle: '',
    endDate: '',
    email: '',
    organizationName: '',
    location: '',
    organizationEmail: '',
    jobType: '',
    JobTime: '',
    salary: '',
    SalaryType: '',
    scheduleMetrics: '',
    experienceLevel: '',
    jobDescription: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.Name.trim() || !formData.organizationName.trim()  || !formData.jobTitle.trim() || !formData.organizationEmail.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Create an object with the form data

    const jobData = {
        Name: formData.Name,
        jobTitle: formData.jobTitle,
        endDate: formData.endDate,
        email: formData.email,
        organizationName: formData.organizationName,
        location: formData.location,
        organizationEmail: formData.organizationEmail,
        jobType: formData.jobType,
        JobTime: formData.JobTime,
        salary: formData.salary,
        SalaryType: formData.SalaryType,
        scheduleMetrics: formData.scheduleMetrics,
        experienceLevel: formData.experienceLevel,
        jobDescription: formData.jobDescription,
      };
      
    // Handle the event data as needed (e.g., send it to a server)
    console.log('Event Data:', jobData);

    // Clear the form fields
    setFormData({
        Name: '',
        jobTitle: '',
        endDate: '',
        email: '',
        organizationName: '',
        location: '',
        organizationEmail: '',
        jobType: '',
        JobTime: '',
        salary: '',
        SalaryType: '',
        scheduleMetrics: '',
        experienceLevel: '',
        jobDescription: '',
    });

    // Close the modal
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Event</Modal.Title>
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
              name="jobDescription"
              value={formData.jobDescription

              }
              onChange={handleChange}
              placeholder="Enter description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
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
            Add Job
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export {JobModal};
