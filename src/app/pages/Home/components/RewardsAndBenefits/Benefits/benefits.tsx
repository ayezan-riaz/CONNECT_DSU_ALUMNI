import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CorporatePartner } from '../../../../../pages/alumni/dsu/components/corporatePartner/components/corporatePartner' // Import the CorporatePartner type
import './benefits.css'
import { Link } from 'react-router-dom'
import background from '../../../../alumni/assets/DefaultImage.jpg'
const Benefits: React.FC = () => {
  const [corporates, setCorporates] = useState<CorporatePartner[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedCorporate, setSelectedCorporate] = useState<CorporatePartner | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [corporateToDelete, setCorporateToDelete] = useState<CorporatePartner | null>(null)
  const Imageurl = 'http://13.200.151.68:3000/api/corporate-partners/'
  const roleId = parseInt(localStorage.getItem('role') || '0', 10)
  const fetchCorporates = () => {
    axios
      .get<CorporatePartner[]>('http://13.200.151.68:3000/api/corporate-partners')
      .then((response) => {
        setCorporates(response.data)
      })
      .catch((error) => {
        console.error('There was a problem fetching the corporate partners data:', error)
      })
  }

  useEffect(() => {
    fetchCorporates()
  }, [])

  return (
    <>
      <div className='container'>
        <div className='row  mb-5'>
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <h1
              style={{
                textAlign: 'center',
                color: '#80171d',
                fontSize: '30px',
                fontWeight: 'bold',
              }}
            >
              Corporate Partners
            </h1>
          </div>
        </div>
        <div className='container corporate-partners-container'>
          <div className='row'>
            {corporates.map((corporate, index) => (
              <div key={corporate.id} className='col-lg-4 col-md-6 col-sm-12 mb-4'>
                <div className='corporate-card'>
                  <div className='corporate-card-image'>
                    <img
                      src={`http://13.200.151.68:3000/corporate-partner/${corporate.image || 'avatar.jpg'
                        }`}
                      alt={`${corporate.name}`}
                      className='img-fluid'
                    />
                  </div>
                  <div className='corporate-card-details'>
                    <h5 className='corporate-name'>{corporate.name}</h5>
                    <p className='corporate-discount'>
                      Discount Offer: {corporate.discounted_offer}
                    </p>
                    <p className='corporate-date'>
                      Valid Date: {new Date(corporate.valid_date).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Benefits
