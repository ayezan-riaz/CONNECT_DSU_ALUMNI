import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './job.css';
import JobModal from './jobModal'; // Import the JobModal component
import { Jobs } from './jobTypes';

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchJobs = () => {
    axios.get('https://ams-backend-gkxg.onrender.com/api/jobs')
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

  return (
    <div>
      <div className="row mb-5">
        <div className="col-2 offset-10">
          <button className="btn btn-primary des" style={{ background: "rgb(255, 255, 255)" }} onClick={() => openModal()}>
            Add new Job
          </button>
        </div>
      </div>
      <div className="row">
        {jobs.map((job) => (
          <div key={job.id} className="col-lg-4 col-md-4 col-sm-12">
            <div className="card card-custom card-stretch-50 shadow mb-5">
              <div className="card-header">
                <h3 className="card-title">
                  <h5 className="card-title job-title">{job.title}</h5>
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <p>{job.organization_name}</p>
                  </div>
                  <div className="col-12">
                    <p>
                      <i style={{ marginRight: '5px' }} className="fas fa-map-marker-alt" />
                      {job.location}
                    </p>
                  </div>
                  <div className="col-12">
                    <p className="">
                      <i style={{ marginRight: "5px" }} className="fas fa-email" />
                      {job.organization_email}
                    </p>
                  </div>
                  <div className="col-12">
                    <p className="">
                      <i style={{ marginRight: "5px" }} className="fas fa-clock" />
                      {job.job_time}
                    </p>
                  </div>
                  <div className="col-12">
                    <p className="">
                      <i style={{ marginRight: "5px" }} className="fas fa-clock" />
                      {new Date(job.end_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-12">
                    <p className="">
                      <i style={{ marginRight: "5px" }} className="fas fa-wallet" />
                      {job.salary_type} {job.salary} {job.schedule_metrics}
                    </p>
                  </div>
                  <div className="col-12">
                    <p className="">
                      <i style={{ marginRight: "5px" }} className="fas fa-briefcase" />
                      {job.experience}
                    </p>
                  </div>
                  <div className="col-12">
                    <p className="card-text">{job.description}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => openModal(job)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <JobModal isOpen={showModal} onClose={closeModal} selectedJob={selectedJob} fetchJobs={fetchJobs} />
    </div>
  );
}

export default Job;
