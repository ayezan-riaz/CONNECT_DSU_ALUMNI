import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './job.css';
import { Jobs } from './jobTypes';

const ApprovedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);

  const fetchJobs = () => {
    axios.get('https://ams-backend-gkxg.onrender.com/api/jobs/unapproved')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openModal = (job?: Jobs) => {
    if (job) {
      setSelectedJob(job);
    } else {
      setSelectedJob(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openDeleteModal = (jobId: number) => {
    setJobToDelete(jobId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  const handleDelete = () => {
    if (jobToDelete !== null) {
      axios.delete(`https://ams-backend-gkxg.onrender.com/api/jobs/${jobToDelete}`)
        .then(response => {
          fetchJobs();
          console.log('Job deleted successfully');
          closeDeleteModal();
        })
        .catch(error => {
          console.error('Error deleting job:', error);
        });
    }
  };

  const handleApprove = (jobId: number) => {
    const token = localStorage.getItem('token');
    axios.post(`https://ams-backend-gkxg.onrender.com/api/jobs/approve`, { id: jobId }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        fetchJobs();
        console.log('Job approved successfully');
      })
      .catch(error => {
        console.error('Error approving job:', error);
      });
  };

  return (
    <>
      <div className="card mb-5 mb-xl-8">
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">Approved Jobs</span>
            <span className="text-muted mt-1 fw-semibold fs-7">List of unapproved jobs</span>
          </h3>
        </div>
        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted">
                  <th className="min-w-200px">Title</th>
                  <th className="min-w-150px">Organization Name</th>
                  <th className="min-w-150px">Organization Email</th>
                  <th className="min-w-150px">Location</th>
                  <th className="min-w-100px">Salary</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.organization_name}</td>
                    <td>{job.organization_email}</td>
                    <td>{job.location}</td>
                    <td>{job.salary}</td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end flex-shrink-0">
                        <Button
                          variant="success"
                          size="sm"
                          className="me-1"
                          onClick={() => handleApprove(job.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => openDeleteModal(job.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Job details can be displayed here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApprovedJobs;
