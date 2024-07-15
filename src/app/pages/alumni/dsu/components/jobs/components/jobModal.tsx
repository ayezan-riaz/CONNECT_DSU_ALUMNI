import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { Jobs } from './jobTypes'; // Import the common Job type

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: Jobs | null;
  fetchJobs: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose, selectedJob, fetchJobs }) => {
  const [formData, setFormData] = useState<Jobs>({
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
    debugger
    const accessToken = localStorage.getItem('token'); // Retrieve the access token from local storage

    if (!accessToken) {
      toast.error('Access token not found');
      return;
    }

    const { id, ...jobData } = formData; // Exclude the id when posting new job data

    try {
      if (selectedJob) {
        await axios.patch(
          `https://ams-backend-gkxg.onrender.com/api/jobs/${selectedJob.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`, // Include the access token in the headers
            }
          }
        );
        toast.success('Job updated successfully');
      } else {
        await axios.post(
          'https://ams-backend-gkxg.onrender.com/api/jobs',
          jobData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`, // Include the access token in the headers
            }
          }
        );
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Input validation for alphabets in name fields
    if (name === 'title' || name === 'organization_name') {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        toast.error('Only alphabets are allowed');
        return;
      }
    }

    // Input validation for numbers in salary field
    if (name === 'salary') {
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) {
        toast.error('Only numbers are allowed');
        return;
      }
    }

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
          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter description'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="organization_name"
              value={formData.organization_name}
              onChange={handleChange}
              placeholder="Enter organization name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Organization Email</Form.Label>
            <Form.Control
              type="email"
              name="organization_email"
              value={formData.organization_email}
              onChange={handleChange}
              placeholder="Enter organization email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary Type</Form.Label>
            <Form.Control
              as="select"
              name="salary_type"
              value={formData.salary_type}
              onChange={handleChange}
            >
              <option value="">Select salary type</option>
              <option value="$">$ Dollar</option>
              <option value="₹">₹ Rupees</option>
              <option value="€">€ Euro</option>
              <option value="£">£ Pound</option>
              <option value="¥">¥ Yen</option>
              {/* Add more salary types as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select job type</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              {/* Add more job types as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              as="select"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="">Select experience level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              {/* Add more experience levels as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job Time</Form.Label>
            <Form.Control
              as="select"
              name="job_time"
              value={formData.job_time}
              onChange={handleChange}
            >
              <option value="">Select job time</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Project Based">Project Based</option>
              {/* Add more job times as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Schedule Metrics</Form.Label>
            <Form.Control
              as="select"
              name="schedule_metrics"
              value={formData.schedule_metrics}
              onChange={handleChange}
            >
              <option value="">Select schedule metrics</option>
              <option value="Per Hour">Per Hour</option>
              <option value="Per Week">Per Week</option>
              <option value="Per Month">Per Month</option>
              {/* Add more schedule metrics as needed */}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            {selectedJob ? 'Update Job' : 'Add Job'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default JobModal;
