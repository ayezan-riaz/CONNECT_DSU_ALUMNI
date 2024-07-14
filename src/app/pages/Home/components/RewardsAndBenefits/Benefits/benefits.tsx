
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CorporatePartner } from '../../../../../pages/alumni/dsu/components/corporatePartner/components/corporatePartner'; // Import the CorporatePartner type
import './benefits.css'
import { Link } from 'react-router-dom';

const Benefits: React.FC = () => {
  const [corporates, setCorporates] = useState<CorporatePartner[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCorporate, setSelectedCorporate] = useState<CorporatePartner | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [corporateToDelete, setCorporateToDelete] = useState<CorporatePartner | null>(null);
  const Imageurl = 'https://ams-backend-gkxg.onrender.com/api/corporate-partners/';
  const roleId = parseInt(localStorage.getItem('role') || '0', 10)
  const fetchCorporates = () => {
    axios
      .get<CorporatePartner[]>('https://ams-backend-gkxg.onrender.com/api/corporate-partners')
      .then((response) => {
        setCorporates(response.data);
      })
      .catch((error) => {
        console.error('There was a problem fetching the corporate partners data:', error);
      });
  };

  useEffect(() => {
    fetchCorporates();
  }, []);


  return (
    <>
      <div className='container'>



        <div className='row mt-15 mb-5'>
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <h1 className='text-css'>
              Corporate Partners
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
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">Corporate Partners</span>
              <span className="text-muted mt-1 fw-semibold fs-7">List of corporate partners</span>
            </h3>
          </div>
          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bold text-muted">
                    <th className="min-w-50px">Sno</th>
                    <th className="min-w-200px">Facilities</th>
                    <th className="min-w-150px">Discount Offer</th>
                    <th className="min-w-150px">Validate Date</th>
                  </tr>
                </thead>
                <tbody>
                  {corporates.map((corporate, index) => (
                    <tr key={corporate.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-50px me-5">
                            <img
                              // src={`${Imageurl}${corporate.image}`}
                              src={`https://ams-backend-gkxg.onrender.com/corporate-partners/${corporate.image || 'default-avatar.png'}`}
                              alt={`${corporate.name}`}
                              className="img-fluid"
                              style={{ maxHeight: '100px' }}
                            />
                          </div>
                          <div className="d-flex justify-content-start flex-column">
                            <span className="text-dark fw-bold text-hover-primary fs-6">
                              {corporate.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{corporate.discounted_offer}</td>
                      <td>{new Date(corporate.valid_date).toDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefits;


