import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Testimonial } from '../../../../pages/alumni/dsu/components/testimonials/components/testimonialType';


const HomeTestimonial: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

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

 
 

  return (
    <>
      <div className="container">
    <div className='row'>
<h1 style={{ textAlign: 'center' , color: '#80171d', fontSize: '30px'	,fontWeight: 'bold'	}}>Testimonials</h1>
    </div>
        <div className="row">
          {testimonials.map((testimonial) => (
            
            <div key={testimonial.id} className="col-lg-4 col-md-4 col-sm-12">
             
              <div className="card card-dashed">
{/*          
                <div className="card-header" style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                    
                  </p>
                  <p>{testimonial.designation} / {testimonial.company}</p>
                </div>
              
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </>
  );
};

export default HomeTestimonial;
