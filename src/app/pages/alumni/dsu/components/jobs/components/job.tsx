import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './job.css'
import JobModal from './jobModal' // Import the JobModal component
import {Jobs} from './jobTypes'
import {Modal, Button} from 'react-bootstrap'

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs[]>([])
  const [selectedJob, setSelectedJob] = useState<Jobs | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [deleteJobId, setDeleteJobId] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const user_id = parseInt(localStorage.getItem('sub') || '0', 10)
  const role = parseInt(localStorage.getItem('role') || '0', 10)

  const fetchJobs = () => {
    axios
      .get('http://13.200.151.68:3000/api/jobs')
      .then((response) => {
        setJobs(response.data.filter((job: Jobs) => job.isApproved))
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error)
      })
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const openModal = (job?: Jobs) => {
    if (job) {
      setSelectedJob(job)
    } else {
      setSelectedJob(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const openDeleteModal = (jobId: number) => {
    setDeleteJobId(jobId)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setDeleteJobId(null)
  }

  const handleDelete = () => {
    if (deleteJobId !== null) {
      axios
        .delete(`http://13.200.151.68:3000/api/jobs/${deleteJobId}`)
        .then(() => {
          fetchJobs()
          closeDeleteModal()
        })
        .catch((error) => {
          console.error('Error deleting job:', error)
        })
    }
  }

  return (
    <div>
      <div className='row mb-5'>
        <div className='col-2 offset-10'>
          <button
            className='btn btn-primary des'
            style={{background: 'rgb(255, 255, 255)'}}
            onClick={() => openModal()}
          >
            Add new Job
          </button>
        </div>
      </div>

      <div className='row'>
        {jobs.map((job) => (
          <div key={job.id} className='col-lg-4 col-md-4 col-sm-12'>
            <div className='card card-custom card-stretch-50 shadow mb-5'>
              {role === 1 && (
                <span style={{position: 'absolute', top: '10px', right: '10px', zIndex: 1}}>
                  <i
                    className='fa fa-times-circle'
                    style={{fontSize: '20px', color: '#80171d', cursor: 'pointer'}}
                    onClick={() => openDeleteModal(job.id)}
                  ></i>
                </span>
              )}
              {role === 2 && job.userId === user_id && (
                <span style={{position: 'absolute', top: '10px', right: '10px', zIndex: 1}}>
                  <i
                    className='fa fa-times-circle'
                    style={{fontSize: '20px', color: '#80171d', cursor: 'pointer'}}
                    onClick={() => openDeleteModal(job.id)}
                  ></i>
                </span>
              )}
              <div className='card-header d-flex justify-content-between align-items-center'>
                <h5 className='card-title job-title'>{job.title}</h5>
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
                      <i style={{marginRight: '5px'}} className='fas fa-calendar' />
                      {new Date(job.end_date).toLocaleDateString()}
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
              {role === 1 && (
                <div className='card-footer'>
                  <button className='btn btn-primary' onClick={() => openModal(job)}>
                    Edit
                  </button>
                </div>
              )}
              {role === 2 && job.userId === user_id && (
                <div className='card-footer'>
                  <button className='btn btn-primary' onClick={() => openModal(job)}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <JobModal
        isOpen={showModal}
        onClose={closeModal}
        selectedJob={selectedJob}
        fetchJobs={fetchJobs}
      />

      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeDeleteModal}>
            No
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Job
