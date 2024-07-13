import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Testimonial } from './testimonialType';
import TestimonialsModal from './testimonialsModal';
import './testimonials.css';

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      <div className="container">
        <div className="row mb-5">
          <div className="col-3 offset-9">
            <button className="btn btn-primary des " onClick={() => openModal()}>
              Add new Testimonial
            </button>
          </div>
        </div>
        Ayezan
        <div className="row">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col-lg-4 col-md-4 col-sm-12">
              <div className="card card-dashed">
                <div className="card-header" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div className="symbol symbol-circle symbol-50px">
                    <img src={testimonial.avatar || 'default-avatar.png'} alt={`${testimonial.first_name} ${testimonial.last_name}`} />
                  </div>
                </div>
                <div className="card-body">
                  <p>{testimonial.testimony}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary" onClick={() => openModal(testimonial)}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TestimonialsModal isOpen={showModal} onClose={closeModal} selectedTestimonial={selectedTestimonial} fetchTestimonials={fetchTestimonials} />
    </>
  );
};

export default TestimonialsPage;
