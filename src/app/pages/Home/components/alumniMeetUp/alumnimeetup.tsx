import React from 'react';
import { Carousel } from 'react-bootstrap';
import m1 from '../../../../pages/alumni/assets/AlumniMeetUp/m1.jpg';
import m2 from '../../../../pages/alumni/assets/AlumniMeetUp/m2.jpg';
import m3 from '../../../../pages/alumni/assets/AlumniMeetUp/m3.jpg';
import m4 from '../../../../pages/alumni/assets/AlumniMeetUp/m4.jpg';
import m5 from '../../../../pages/alumni/assets/AlumniMeetUp/m5.jpg';
import m6 from '../../../../pages/alumni/assets/AlumniMeetUp/m6.jpg';
import m7 from '../../../../pages/alumni/assets/AlumniMeetUp/m7.jpg';
import m8 from '../../../../pages/alumni/assets/AlumniMeetUp/m8.jpg';
import m9 from '../../../../pages/alumni/assets/AlumniMeetUp/m9.jpg';
import m10 from '../../../../pages/alumni/assets/AlumniMeetUp/m10.jpg';
import m11 from '../../../../pages/alumni/assets/AlumniMeetUp/m11.jpg';
import m12 from '../../../../pages/alumni/assets/AlumniMeetUp/m12.jpg';
import background from '../../../../pages/alumni/assets/AlumniMeetUp/back.png'; // Adjust the path to your background image
import './alumnimeetup.css';

const images = [
  { src: m1, alt: 'Alumni Meet-up Image 1' },
  { src: m2, alt: 'Alumni Meet-up Image 2' },
  { src: m3, alt: 'Alumni Meet-up Image 3' },
  { src: m4, alt: 'Alumni Meet-up Image 4' },
  { src: m5, alt: 'Alumni Meet-up Image 5' },
  { src: m6, alt: 'Alumni Meet-up Image 6' },
  { src: m7, alt: 'Alumni Meet-up Image 7' },
  { src: m8, alt: 'Alumni Meet-up Image 8' },
  { src: m9, alt: 'Alumni Meet-up Image 9' },
  { src: m10, alt: 'Alumni Meet-up Image 10' },
  { src: m11, alt: 'Alumni Meet-up Image 11' },
  { src: m12, alt: 'Alumni Meet-up Image 12' },
];

const AlumniMeetup: React.FC = () => {
  return (
    <div className="alumni-meetup-background" style={{ backgroundImage: `url(${background})` }}>
      <div className="alumni-meetup-container">
        <h1 className="main-heading text-center mb-4">Alumni Meet-up with MS Faculty – 3rd November, 2023</h1>
        <div className="content">
          <div className="description">
            <p>The Office of Alumni Relations organized an Alumni meet-up of selected MS Alumni with the MS Faculty on the 3rd of November, 2023. The session was chaired by Dean M&SS, Prof. Dr. Bashir Ahmed, and in presence were Registrar, Brig (Retd). Dr. Muhammad Asif Iqbal SI(M), HoD MS, Dr. Sobia Iqbal, Director of Alumni Relations, Ms. Tehseen Azhar and faculty members of the Management Sciences Department.</p>
            <p>The purpose of arranging this meet-up was to engage the MS Alumni in bridging the gap between academia and industry and seek their valuable feedback in curriculum development and placement initiatives.</p>
          </div>
          <div className="carousel-container">
            <Carousel>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image.src}
                    alt={image.alt}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlumniMeetup;
