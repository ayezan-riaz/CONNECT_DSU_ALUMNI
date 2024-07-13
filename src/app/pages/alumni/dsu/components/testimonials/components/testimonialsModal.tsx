import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { Testimonial } from './testimonialType';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTestimonial: Testimonial | null;
  fetchTestimonials: () => void;
}

const TestimonialsModal: React.FC<TestimonialModalProps> = ({ isOpen, onClose, selectedTestimonial, fetchTestimonials }) => {
  const [formData, setFormData] = useState<{ testimony: string, userId: number }>({
    testimony: '',
    userId: parseInt(localStorage.getItem('sub') || '0', 10),
  });

  useEffect(() => {
    if (selectedTestimonial) {
      axios.get(`https://ams-backend-gkxg.onrender.com/api/testimonial/${selectedTestimonial.id}`)
        .then(response => {
          setFormData({
            testimony: response.data.testimony,
            userId: response.data.userId,
          });
        })
        .catch(error => {
          console.error('Error fetching testimonial details:', error);
          toast.error('Failed to fetch testimonial details');
        });
    } else {
      setFormData({
        testimony: '',
        userId: parseInt(localStorage.getItem('sub') || '0', 10),
      });
    }
  }, [selectedTestimonial, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.testimony.trim()) {
      toast.error('Please fill in the testimony');
      return;
    }

    try {
      if (selectedTestimonial) {
        await axios.patch(`https://ams-backend-gkxg.onrender.com/api/testimonial/${selectedTestimonial.id}`, formData, {
          headers: { 'Content-Type': 'application/json' }
        });
        toast.success('Testimonial updated successfully');
      } else {
        await axios.post('https://ams-backend-gkxg.onrender.com/api/testimonial', formData, {
          headers: { 'Content-Type': 'application/json' }
        });
        toast.success('Testimonial added successfully');
      }
      fetchTestimonials();
      onClose();
    } catch (err) {
      const error = err as AxiosError;
      console.error('Error submitting testimonial:', error.response ? error.response.data : error.message);
      toast.error('Failed to submit testimonial');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Testimony</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="testimony"
              value={formData.testimony}
              onChange={handleChange}
              placeholder="Enter testimony"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {selectedTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TestimonialsModal;
