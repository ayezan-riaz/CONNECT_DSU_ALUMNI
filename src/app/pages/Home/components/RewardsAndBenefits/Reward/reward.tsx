import './reward.css';
import React from 'react';

const Reward: React.FC = () => {
  return (
    <div className='row mt-15'>
      <div className='col-lg-12 col-md-12 col-sm-12'>
        <h1 className='text-css'>
          Welcome To <span>DHA SUFFA UNIVERSITY</span> Alumni Portal
        </h1>
      </div>

      <div className='col-lg-12 col-md-12 col-sm-12 text-center mt-15'>
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
  );
}

export default Reward;
