import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { Job } from './jobTypes'; // Import the common Job type

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: Job | null;
  fetchJobs: () => void;
}

const JobPosting: React.FC<JobModalProps> = ({ isOpen, onClose, selectedJob, fetchJobs }) => {
  const [formData, setFormData] = useState<Job>({
    id: -1,
    title: '',
    description: '',
    end_date: '',
    organization_name: '',
    organization_email: '',
    location: '',
    salary: '',
    salary_type: '',
    type: '',
    experience: '',
    job_time: '',
    schedule_metrics: '',
    isApproved: false,
    isCreatedByAdmin: false,
  });

  useEffect(() => {
    if (selectedJob) {
      axios.get(`https://ams-backend-gkxg.onrender.com/api/jobs/${selectedJob.id}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching job details:', error);
          toast.error('Failed to fetch job details');
        });
    } else {
      setFormData({
        id: -1,
        title: '',
        description: '',
        end_date: '',
        organization_name: '',
        organization_email: '',
        location: '',
        salary: '',
        salary_type: '',
        type: '',
        experience: '',
        job_time: '',
        schedule_metrics: '',
        isApproved: false,
        isCreatedByAdmin: false,
      });
    }
  }, [selectedJob, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.end_date) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (selectedJob) {
        await axios.patch(`https://ams-backend-gkxg.onrender.com/api/jobs/${selectedJob.id}`, formData, {
          headers: { 'Content-Type': 'application/json' }
        });
        toast.success('Job updated successfully');
      } else {
        await axios.post('https://ams-backend-gkxg.onrender.com/api/jobs', formData, {
          headers: { 'Content-Type': 'application/json' }
        });
        toast.success('Job added successfully');
      }
      fetchJobs();
      onClose();
    } catch (err) {
      const error = err as AxiosError;
      console.error('Error submitting job:', error.response ? error.response.data : error.message);
      toast.error('Failed to submit job');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedJob ? 'Edit Job' : 'Add New Job'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
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
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Add more form fields as required */}
          <Button variant="primary" type="submit">
            {selectedJob ? 'Update Job' : 'Add Job'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default JobPosting;
