import React, {useState, ChangeEvent, FormEvent} from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import logo from '../assets/logo.png'

interface FormData {
  jobTitle: string
  endDate: string
  email: string
  organizationName: string
  location: string
  organizationEmail: string
  jobType: string
  JobTime: string
  salary: string
  SalaryType: string
  scheduleMetrics: string
  experienceLevel: string
  jobDescription: string
}

const JobPosting: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
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
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic form validation
    if (!formData.jobTitle.trim()) {
      toast.error('Job Title is required')
      return
    }

    if (!formData.organizationName.trim()) {
      toast.error('Organization Name is required')
      return
    }

    if (!formData.email.trim()) {
      toast.error('Organization Email is required')
      return
    }

    // Validate email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const gmailDomain = /@gmail\.com$/

    if (!emailPattern.test(formData.email) || !gmailDomain.test(formData.email)) {
      toast.error('Invalid email format or domain. Please use a valid Gmail email address.')
      return
    }
    if (!formData.jobDescription.trim()) {
      toast.error('Job Description is required')
      return
    }

    // If all validations pass, create an object and display it in the console
    const formObject = {
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      endDate: formData.endDate,
      organizationName: formData.organizationName,
      email: formData.email,
    }

    console.log('Form Data:', formObject)

    // Clear the form fields after submission
    setFormData({
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
    })

    toast.success('Job posted successfully!')
  }

  return (
    <div>
      <div className='card shadow-sm'>
        <div className='card-body p-0'>
          <div className='card-p mb-10'>
            <div className='text-center px-4'>
              <img className='mw-100 mh-300px card-rounded-bottom' alt='' src={logo} />
            </div>
            <form id='jobPostingForm' className='form' onSubmit={handleSubmit}>
              {/* Job Title */}
              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Job Title</span>
                </label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  name='jobTitle'
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>
              {/* Apply Date */}
              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>End Date</span>
                </label>
                <input
                  type='date'
                  className='form-control form-control-solid'
                  name='endDate'
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>

              {/* Organization Name */}
              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Organization Name</span>
                </label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  name='organizationName'
                  value={formData.organizationName}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Organization Email</span>
                </label>
                <input
                  type='email'
                  className='form-control form-control-solid'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>location</span>
                </label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  name='jobTitle'
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Salary</span>
                </label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  name='salary'
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {/* Job Type Dropdown */}
              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Job Type</span>
                </label>
                <select
                  className='form-select form-select-solid'
                  name='jobType'
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value=''>Select Job Type</option>
                  <option value='Remote'>Remote</option>
                  <option value='Onsite'>Onsite</option>
                </select>
              </div>
              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Schedule Metrics</span>
                </label>
                <select
                  className='form-select form-select-solid'
                  name='jobType'
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value=''>Select schedule Metrics</option>
                  <option value='permonth'>Per Month</option>
                  <option value='per hour'>Per Hour</option>
                  <option value='per week'>Per Week</option>
                </select>
              </div>
              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Experience Level</span>
                </label>
                <select
                  className='form-select form-select-solid'
                  name='jobType'
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value=''>Select Experience Level</option>
                  <option value='permonth'>Fresh</option>
                  <option value='permonth'>Intern</option>
                  <option value='per hour'>Intermediate</option>
                  <option value='per week'>Experience</option>
                </select>
              </div>
              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Job Time</span>
                </label>
                <select
                  className='form-select form-select-solid'
                  name='jobType'
                  value={formData.JobTime}
                  onChange={handleChange}
                >
                  <option value=''>Select JobTime</option>
                  <option value='FullTime'>Full Time</option>
                  <option value='PartTime'>Part Time</option>
                  <option value='ProjectBased'>Project Based</option>
                </select>
              </div>
              <div className='fv-row mb-7'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Salary Type</span>
                </label>
                <select
                  className='form-select form-select-solid'
                  name='jobType'
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value=''>Select Salary Type</option>
                  <option value='$'>$</option>
                  <option value='Rs'>RS</option>
                  <option value='Eur'>Eur</option>
                </select>
              </div>
              {/* ... (other form fields) */}
              <div className='fv-row mb-15'>
                <label className='fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>jobDescription</span>
                </label>
                <textarea
                  className='form-control form-control-solid rounded-3'
                  name='jobDescription'
                  value={formData.jobDescription}
                  onChange={handleChange}
                />
              </div>
              <div className='text-center'>
                <button type='submit' id='jobPostingFormSubmit' className='btn btn-primary'>
                  <span className='indicator-label'> Post Job</span>
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2' />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='col-xl-4'>
        {/*begin::Statistics Widget 2*/}
        <div className='card card-xl-stretch mb-xl-8'>
          {/*begin::Body*/}
          <div className='card-body d-flex align-items-center pt-3 pb-0'>
            <div className='d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2'>
              <a href='#' className='fw-bold text-dark fs-4 mb-2 text-hover-primary'>
                Lisa Bold
              </a>
              <span className='fw-semibold text-muted fs-5'>Marketing &amp; Fanance Manager</span>
            </div>
            <img
              src='assets/media/svg/avatars/014-girl-7.svg'
              alt=''
              className='align-self-end h-100px'
            />
          </div>
          {/*end::Body*/}
        </div>
        {/*end::Statistics Widget 2*/}
      </div>
    </div>
  )
}

export default JobPosting

// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import logo from '../assets/logo.png';

// interface FormData {
//     jobTitle: string;
//     jobDescription: string;
//     endDate: string;
//     organizationName: string;
//     email: string;
// }

// const JobPosting: React.FC = () => {
//     console.log("Ayezan Post Job ");

//     const [formData, setFormData] = useState<FormData>({
//         jobTitle: '',
//         endDate: '',
//         organizationName: '',
//         email: '',
//         jobDescription: '',
//     });

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         // Basic form validation
//         if (
//             formData.jobTitle.trim() === ''

//         ) {
//             toast.error('Job Title are required');
//             return;
//         }

//         if (

//             formData.organizationName.trim() === ''

//         ) {
//             toast.error('Organization Name are required');
//             return;
//         }
//         if (

//             formData.email.trim() === ''
//         ) {
//             toast.error('Email are required');
//             return;
//         }
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(formData.email)) {
//             toast.error('Invalid email format');
//             return;
//         }
//         if (

//             formData.jobDescription.trim() === ''

//         ) {
//             toast.error('Job Description are required');
//             return;
//         }
//         // Custom validation: Check if Job Title is the same as Organization Name

//         // If all validations pass, create an object and display it in the console
//         const formObject = {
//             jobTitle: formData.jobTitle,
//             jobDescription: formData.jobDescription,
//             endDate: formData.endDate,
//             organizationName: formData.organizationName,
//             email: formData.email,
//         };

//         console.log('Form Data:', formObject);

//         // Clear the form fields after submission
//         setFormData({
//             jobTitle: '',
//             jobDescription: '',
//             endDate: '',
//             organizationName: '',
//             email: '',
//         });

//         toast.success('Job posted successfully!');
//     };

//     return (
//         <div>
//             <div className="card shadow-sm">
//                 <div className="card-body p-0">
//                     <div className="card-p mb-10">
//                         <div className="text-center px-4">
//                             <img
//                                 className="mw-100 mh-300px card-rounded-bottom"
//                                 alt=""
//                                 src={logo}
//                             />
//                         </div>
//                         <form id="jobPostingForm" className="form" onSubmit={handleSubmit}>
//                             {/* Job Title */}
//                             <div className="fv-row mb-7">
//                                 <label className="fs-6 fw-semibold form-label mb-2">
//                                     <span className="required">Job Title</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="form-control form-control-solid"
//                                     name="jobTitle"
//                                     value={formData.jobTitle}
//                                     onChange={handleChange}
//                                 />
//                             </div>

//                             {/* Apply Date */}
//                             <div className="fv-row mb-7">
//                                 <label className="fs-6 fw-semibold form-label mb-2">
//                                     <span className="required">End Date</span>
//                                 </label>
//                                 <input
//                                     type="date"
//                                     className="form-control form-control-solid"
//                                     name="endDate"
//                                     value={formData.endDate}
//                                     onChange={handleChange}

//                                 />
//                             </div>

//                             {/* Organization Name */}
//                             <div className="fv-row mb-7">
//                                 <label className="fs-6 fw-semibold form-label mb-2">
//                                     <span className="required">Organization Name</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="form-control form-control-solid"
//                                     name="organizationName"
//                                     value={formData.organizationName}
//                                     onChange={handleChange}
//                                 />
//                             </div>

//                             {/* Email */}
//                             <div className="fv-row mb-7">
//                                 <label className="fs-6 fw-semibold form-label mb-2">
//                                     <span className="required">Organization Email</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     className="form-control form-control-solid"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                 />
//                             </div>

//                             <div className="fv-row mb-15">
//                                 <label className="fs-6 fw-semibold form-label mb-2">
//                                     <span className="required">Job Description</span>
//                                 </label>
//                                 <textarea
//                                     className="form-control form-control-solid rounded-3"
//                                     name="jobDescription"
//                                     value={formData.jobDescription}
//                                     onChange={handleChange}
//                                 />
//                             </div>

//                             {/* ... (other form fields) */}

//                             <div className="text-center">
//                                 <button
//                                     type="submit"
//                                     id="jobPostingFormSubmit"
//                                     className="btn btn-primary"
//                                 >
//                                     <span className="indicator-label">Post Job</span>
//                                     <span className="indicator-progress">
//                                         Please wait...
//                                         <span className="spinner-border spinner-border-sm align-middle ms-2" />
//                                     </span>
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JobPosting;
