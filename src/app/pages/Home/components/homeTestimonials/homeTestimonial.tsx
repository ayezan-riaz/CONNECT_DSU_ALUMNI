import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Testimonial} from '../../../../pages/alumni/dsu/components/testimonials/components/testimonialType'

const HomeTestimonial: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

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

  return (
    <div className='container'>
      <div className='row'>
        <h1
          style={{
            textAlign: 'center',
            color: '#80171d',
            fontSize: '30px',
            fontWeight: 'bold',
          }}
        >
          Testimonials
        </h1>
      </div>
      <div className='row'>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className='mb-4 col-lg-4 col-md-6 col-sm-12'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='testimonial-image text-center mb-3'>
                  <img
                    src={`http://13.200.151.68:3000/alumni/${
                      testimonial.avatar || 'default-avatar.png'
                    }`}
                    alt={`${testimonial.first_name} ${testimonial.last_name}`}
                    className='img-fluid rounded-circle'
                    style={{width: '100px', height: '100px', objectFit: 'cover'}}
                  />
                </div>
                <div className='testimonial-text text-center'>
                  <p className='blockquote'>“{testimonial.testimony}”</p>
                  <p className='font-weight-bold mb-1'>
                    {`${testimonial.first_name} ${testimonial.middle_name} ${testimonial.last_name}`.trim()}
                  </p>
                  <p className='text-muted mb-0'>
                    {testimonial.designation} / {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeTestimonial
