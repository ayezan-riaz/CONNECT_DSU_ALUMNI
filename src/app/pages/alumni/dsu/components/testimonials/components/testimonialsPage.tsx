import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Testimonial } from './testimonialType';
import TestimonialsModal from './testimonialsModal';
import { Modal, Button } from 'react-bootstrap';
import './testimonials.css';

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<number | null>(null);

  const fetchTestimonials = () => {
    axios.get('https://ams-backend-gkxg.onrender.com/api/testimonial')
      .then(response => {
        setTestimonials(response.data);
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error);
      });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setSelectedTestimonial(testimonial);
    } else {
      setSelectedTestimonial(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openDeleteModal = (testimonialId: number) => {
    setTestimonialToDelete(testimonialId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setTestimonialToDelete(null);
  };

  const handleDelete = () => {
    if (testimonialToDelete !== null) {
      axios.delete(`https://ams-backend-gkxg.onrender.com/api/testimonial/${testimonialToDelete}`)
        .then(response => {
          fetchTestimonials(); // Refresh the testimonials list after deletion
          console.log('Testimonial deleted successfully');
          closeDeleteModal();
        })
        .catch(error => {
          console.error('Error deleting testimonial:', error);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mb-5">
          <div className="col-3 offset-9">
            <button className="btn btn-primary des" onClick={() => openModal()}>
              Add new Testimonial
            </button>
          </div>
        </div>
        <div className="row">
          {testimonials.map((testimonial) => (
            
            <div key={testimonial.id} className="col-lg-4 col-md-4 col-sm-12">
             
              <div className="card card-dashed">
              <span style={{textAlign: 'right'}}>
                    <i
                      className='fa fa-times-circle'
                      style={{fontSize: '20px', color: '#80171d', cursor: 'pointer'}}
                      onClick={() => openDeleteModal(testimonial.id)}
                    ></i>
                  </span>
                {/* <div className="card-header" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div className="symbol symbol-circle symbol-50px "  >
                  <img 
              
                      src={`https://ams-backend-gkxg.onrender.com/alumni/${testimonial.avatar || 'default-avatar.png'}`} 
                      alt={`${testimonial.first_name} ${testimonial.last_name}`} 
                    />
                  </div>
                 
                </div> */}
                <div className="card-body">
                  <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginBottom:'10px' }}>  
                  <div className="symbol symbol-circle symbol-50px "  >
                  <img 
              
                      src={`https://ams-backend-gkxg.onrender.com/alumni/${testimonial.avatar || 'default-avatar.png'}`} 
                      alt={`${testimonial.first_name} ${testimonial.last_name}`} 
                    />
                  </div>
                  </div>
             <div>
             <p>{testimonial.testimony}</p>
             </div>
          
                </div>
                <div className="card-footer">
                <div  style={{ textAlign: 'center' }}>
                <p>
                    {`${testimonial.first_name} ${testimonial.middle_name} ${testimonial.last_name}`.trim()}
                    <span style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => openModal(testimonial)}>
                      <i className='fa fa-pencil' style={{ fontSize: '15px', color: '#80171d' }}></i>
                    </span>
                  </p>
                  <p>{testimonial.designation} / {testimonial.company}</p>
                </div>
              
                </div>
              </div>
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

export default TestimonialsPage;
