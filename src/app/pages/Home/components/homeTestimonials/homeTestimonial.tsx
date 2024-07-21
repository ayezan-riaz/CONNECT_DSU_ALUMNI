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
    <>
      <div className='container'>
        <div className='row'>
          <h1 style={{textAlign: 'center', color: '#80171d', fontSize: '30px', fontWeight: 'bold'}}>
            Testimonials
          </h1>
        </div>
        <div className='row mt-10'>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className='mb-4 col-lg-4 col-md-4 col-sm-12'>
              <div className='card card-ab'>
                <img
                  className='card-img-top object-fit-cover'
                  src={`http://13.200.151.68:3000/alumni/${testimonial.avatar || 'avatar.jpg'}`}
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
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomeTestimonial
