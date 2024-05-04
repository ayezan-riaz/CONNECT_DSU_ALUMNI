import React from 'react';
import './viewjob.css'

interface JobData {
    Id: number,
    JobTitle: string;
    organizationName: string;
    location: string;
    organizationEmail: string;
    jobType: string;
    JobTime: string;
    postDate: string;
    salary: string;
    SalaryType: string,
    scheduleMetrics: string,
    experienceLevel: string;
    jobDescription: string;
}



const viewAllJobs: React.FC = () => {

    const jobData: JobData[] = [
        {
            Id: 1,
            JobTitle: 'D365 Software Developer',
            organizationName: 'PEAK Technical Staffing USA',
            location: 'Frisco, TX',
            organizationEmail: 'ayezanriaz8@gmail.com',
            jobType: 'Remote',
            JobTime: 'Full Time',
            postDate: '2 days ago',
            salary: '50',
            SalaryType: '$',
            scheduleMetrics: 'per month',
            experienceLevel: 'Fresh',
            jobDescription:
                'IT Applications Developers III will lead the design, implementation, and support of the internal application. They are also responsible for maintaining the application as well as verifying the accuracy...',
        },
        {
            Id: 2,
            JobTitle: 'Full Stack Developer',
            organizationName: 'Syscrowd',
            location: 'Karachi,Malir ',
            organizationEmail: 'aiman8@gmail.com',
            jobType: 'Remote',
            JobTime: 'Full Time',
            postDate: '1 days ago',
            salary: '50000',
            SalaryType: '$',
            scheduleMetrics: 'per month',
            experienceLevel: 'Intermediate',
            jobDescription:
                'IT Applications Developers III will lead the design, implementation, and support of the internal application. They are also responsible for maintaining the application as well as verifying the accuracy...',
        },
        {
            Id: 3,
            JobTitle: 'Front End Developer',
            organizationName: '10Pearls',
            location: 'Karachi, defence',
            organizationEmail: 'ahmed8@gmail.com',
            jobType: 'Onsite',
            JobTime: 'Full Time',
            postDate: '2 days ago',
            salary: '700',
            SalaryType: '$',
            scheduleMetrics: 'per month',
            experienceLevel: 'Intern',
            jobDescription:
                'IT Applications Developers III will lead the design, implementation, and support of the internal application. They are also responsible for maintaining the application as well as verifying the accuracy...',
        },
        // Add more objects for additional cards
        // ...
    ];

    return (
        <div>

            <div className="row">
                {/* Map over the jobData array to generate cards dynamically */}
                {jobData.map((job, index) => (

                    <div key={index} className="col-lg-4 col-md-4 col-sm-12">
                        <div className="card card-custom card-stretch-50 shadow mb-5">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <h5 className="card-title job-title">{job.JobTitle}</h5>
                                </h3>
                            </div>
                            <div className="card-body">
                                {/* Display job data dynamically */}
                                <div className="row">
                                    <div className="col-12">
                                        <p>{job.organizationName}</p>
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
                                            {job.organizationEmail}</p>
                                    </div>
                                    <div className="col-12">
                                        <p className="">
                                            <i style={{ marginRight: "5px" }} className="fas fa-clock" />
                                            {job.JobTime}</p>
                                    </div>
                                    <div className="col-12">
                                        <p className="">
                                            <i style={{ marginRight: "5px" }} className="fas fa-clock" />
                                            {job.postDate}</p>
                                    </div>
                                    <div className="col-12">
                                        <p className="">
                                            <i style={{ marginRight: "5px" }} className="fas fa-wallet" />
                                            {job.SalaryType} {job.salary} {job.scheduleMetrics}</p>
                                    </div>
                                    <div className="col-12">
                                        <p className="">
                                            <i style={{ marginRight: "5px" }} className="fas fa-briefcase" />
                                            {job.experienceLevel}</p>
                                    </div>
                                    {/* <div className="col-12">
          <p className="card-text">
          {job.JobTime}
              </p>
          </div> */}
                                    {/* Add more JSX elements for other job details */}
                                </div>
                                <div className="col-12">
                                    <p className="card-text">{job.jobDescription}</p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <a href="https://jobs.github.com/positions/e9e632a7-c756-40c9-b1ca-c3eb5c7f9ce3" target="_blank" className="btn btn-primary">
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
}

export default viewAllJobs
    ;
