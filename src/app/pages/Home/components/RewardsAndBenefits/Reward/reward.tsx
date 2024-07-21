import './reward.css';
import React from 'react';

const Reward: React.FC = () => {
  return (
    <div className='container mt-4'>
      <div className='row text-center mb-4'>
        <div className='col-12'>
          <h1 className='text-css'>
            Welcome To <span>DHA SUFFA UNIVERSITY</span> Alumni Portal
          </h1>
        </div>
      </div>

      <div className='row justify-content-center mb-8'>
        <div className='col-lg-8 col-md-10 col-sm-12'>
          <div className='video-container'>
            <iframe
              src='https://www.youtube.com/embed/AiAQ3dnq6P0?si=tQxPQpW2V0HGTYhi'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reward;
