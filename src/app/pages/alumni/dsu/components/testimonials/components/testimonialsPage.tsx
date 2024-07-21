import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Testimonial} from './testimonialType'
import TestimonialsModal from './testimonialsModal'
import {Modal, Button} from 'react-bootstrap'
import './testimonials.css'

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [testimonialToDelete, setTestimonialToDelete] = useState<number | null>(null)
  const userId = parseInt(localStorage.getItem('sub') || '0', 10)
  const roleId = parseInt(localStorage.getItem('role') || '0', 10)

  const fetchTestimonials = () => {
    axios
      .get('http://13.200.151.68:3000/api/testimonial')
      .then((response) => {
        setTestimonials(response.data)
      })
      .catch((error) => {
        console.error('Error fetching testimonials:', error)
      })
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setSelectedTestimonial(testimonial)
    } else {
      setSelectedTestimonial(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const openDeleteModal = (testimonialId: number) => {
    setTestimonialToDelete(testimonialId)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setTestimonialToDelete(null)
  }

  const handleDelete = () => {
    if (testimonialToDelete !== null) {
      axios
        .delete(`http://13.200.151.68:3000/api/testimonial/${testimonialToDelete}`)
        .then(() => {
          fetchTestimonials() // Refresh the testimonials list after deletion
          closeDeleteModal()
        })
        .catch((error) => {
          console.error('Error deleting testimonial:', error)
        })
    }
  }

  // Filter testimonials based on role
  const filteredTestimonials =
    roleId === 1
      ? testimonials
      : testimonials.filter((testimonial) => testimonial.userId === userId)

  const userHasTestimonial = testimonials.some((testimonial) => testimonial.userId === userId)

  return (
    <>
      <div>
        {roleId === 1 && (
          <div className='card card-ab shadow-sm d-flex flex-row align-items-center justify-content-between p-5'>
            <div>
              <h1 className='fs-1'>Testimonies</h1>
              <em>all of the testimonies given by dsu alumni</em>
            </div>
          </div>
        )}
        <div className='row mb-5'>
          <div className='col-12'>
            {roleId === 2 && !userHasTestimonial && (
              <div className='d-flex flex-column'>
                <div>
                  <h1>No testimony found</h1>
                  <p>
                    You can add testimony to share your academic experience at DHA Suffa University
                  </p>
                </div>
                <button
                  className='btn btn-primary width-2 col-2 mt-5'
                  type='button'
                  onClick={() => openModal()}
                >
                  Add Testimonial
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='row'>
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`mb-4 ${roleId === 1 ? 'col-lg-4 col-md-6 col-sm-12' : 'col-12'}`}
            >
              {roleId === 1 ? (
                <div className='card card-ab'>
                  <img
                    className='card-img-top object-fit-cover'
                    src={`http://13.200.151.68:3000/alumni/${
                      testimonial.avatar || 'default/avatar.jpg'
                    }`}
                    alt={`${testimonial.first_name} ${testimonial.last_name}`}
                  />

                  <div className='card-body'>
                    <p className='text-center'>
                      <strong>
                        {`${testimonial.first_name} ${testimonial.middle_name} ${testimonial.last_name}`.trim()}
                      </strong>
                    </p>
                    <p className='text-center'>
                      <strong>
                        {testimonial.designation} / {testimonial.company}
                      </strong>
                    </p>

                    <div className='border-top border-secondary py-2'>
                      <span className='fw-bolder fs-4 mx-1 text-black'>“</span>
                      <span className='lh-lg text-black'>{testimonial.testimony}</span>
                      <span className='fw-bolder fs-4 mx-1 text-black'>”</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='testimonial-outer-card'>
                  <div className='testimonial-name'>
                    <strong>Testimony</strong>
                  </div>
                  <div className='testimonial-inner-card'>
                    <span className='delete-icon d-flex align-items-center gap-2'>
                      {roleId === 2 && (
                        <i
                          className='fa fa-pencil'
                          style={{fontSize: '15px', color: '#80171d', cursor: 'pointer'}}
                          onClick={() => openModal(testimonial)}
                        ></i>
                      )}

                      {roleId === 2 && (
                        <i
                          className='fa fa-times-circle'
                          style={{fontSize: '20px', color: '#80171d', cursor: 'pointer'}}
                          onClick={() => openDeleteModal(testimonial.id)}
                        ></i>
                      )}
                    </span>
                    <div className='testimonial-content'>
                      <div className='testimonial-image'>
                        <img
                          src={`http://13.200.151.68:3000/alumni/${
                            testimonial.avatar || 'avatar.jpg'
                          }`}
                          alt={`${testimonial.first_name} ${testimonial.last_name}`}
                        />
                      </div>
                      <div className='testimonial-text'>
                        <span className='fw-bolder fs-2 mx-1 text-black'>“</span>
                        <span className='fs-3 text-black'>{testimonial.testimony}</span>
                        <span className='fw-bolder fs-2 mx-1 text-black'>”</span>

                        <section className='my-5'>
                          <p className='fw-bold m-0'>
                            {`${testimonial.first_name} ${testimonial.middle_name} ${testimonial.last_name}`.trim()}
                          </p>
                          <p>
                            {testimonial.designation} / {testimonial.company}
                          </p>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <TestimonialsModal
        isOpen={showModal}
        onClose={closeModal}
        selectedTestimonial={selectedTestimonial}
        fetchTestimonials={fetchTestimonials}
      />

      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this testimonial?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeDeleteModal}>
            No
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TestimonialsPage
