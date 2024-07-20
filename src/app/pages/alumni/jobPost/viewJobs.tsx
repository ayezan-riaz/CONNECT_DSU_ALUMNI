import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'
import JobPosting from './JobPosting' // Import the JobPosting component
import {Job} from './jobTypes' // Import the common Job type
import './event.css'
import {Link} from 'react-router-dom'

const ViewJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null) // Track the selected job
  const [deleteConfirmation, setDeleteConfirmation] = useState(false) // Track delete confirmation

  const fetchJobs = () => {
    axios
      .get<Job[]>('http://13.200.151.68:3000/api/jobs')
      .then((response) => {
        setJobs(response.data)
      })
      .catch((error) => {
        console.error('There was a problem fetching the jobs data:', error)
      })
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const openModal = (job: Job | null) => {
    setSelectedJob(job)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleDeleteConfirmation = () => {
    if (selectedJob) {
      axios
        .delete(`http://13.200.151.68:3000/api/jobs/${selectedJob.id}`)
        .then(() => {
          setJobs(jobs.filter((job) => job.id !== selectedJob.id))
          setDeleteConfirmation(false)
          setSelectedJob(null)
        })
        .catch((error) => {
          console.error('There was a problem deleting the job:', error)
        })
    }
  }

  const handleDelete = (job: Job) => {
    setSelectedJob(job)
    setDeleteConfirmation(true)
  }

  return (
    <div>
      <Button className='btn btn-primary des' onClick={() => openModal(null)}>
        Add new Job
      </Button>

      <div className='row'>
        {jobs.map((job, index) => (
          <div key={index} className='col-lg-4 col-md-4 col-sm-12'>
            <div className='card card-custom card-stretch-50 shadow mb-5'>
              <div className='card-header'>
                <h3 className='card-title'>
                  <h5 className='card-title job-title'>{job.title}</h5>
                </h3>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-12'>
                    <p>{job.organization_name}</p>
                  </div>
                  <div className='col-12'>
                    <p>
                      <i style={{marginRight: '5px'}} className='fas fa-map-marker-alt' />
                      {job.location}
                    </p>
                  </div>
                  <div className='col-12'>
                    <p className=''>
                      <i style={{marginRight: '5px'}} className='fas fa-envelope' />
                      {job.organization_email}
                    </p>
                  </div>
                  <div className='col-12'>
                    <p className=''>
                      <i style={{marginRight: '5px'}} className='fas fa-clock' />
                      {job.job_time}
                    </p>
                  </div>
                  <div className='col-12'>
                    <p className=''>
                      <i style={{marginRight: '5px'}} className='fas fa-wallet' />
                      {job.salary_type} {job.salary} {job.schedule_metrics}
                    </p>
                  </div>
                  <div className='col-12'>
                    <p className=''>
                      <i style={{marginRight: '5px'}} className='fas fa-briefcase' />
                      {job.experience}
                    </p>
                  </div>
                  <div className='col-12'>
                    <p className='card-text'>{job.description}</p>
                  </div>
                </div>
              </div>
              <div className='card-footer'>
                <Button variant='danger' onClick={() => handleDelete(job)}>
                  <i className='fa fa-times-circle'></i>
                </Button>
                <Button variant='primary' onClick={() => openModal(job)}>
                  <i className='fa fa-pencil'></i>
                </Button>
                <a
                  href={`http://13.200.151.68:3000/api/jobs/${job.id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-primary'
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <JobPosting
        isOpen={showModal}
        onClose={closeModal}
        selectedJob={selectedJob}
        fetchJobs={fetchJobs}
      />

      <Modal show={deleteConfirmation} onHide={() => setDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setDeleteConfirmation(false)}>
            No
          </Button>
          <Button variant='primary' onClick={handleDeleteConfirmation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ViewJobs
