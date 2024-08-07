import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'
import CorporateModal from './corporateModal' // Import the CorporateModal component
import {CorporatePartner} from './corporatePartner' // Import the CorporatePartner type
import './corporatePartner.css'
import {Link} from 'react-router-dom'

const CorporatePartnerPage: React.FC = () => {
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

  const openModal = (corporate: CorporatePartner | null = null) => {
    setSelectedCorporate(corporate)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedCorporate(null) // Clear the selected corporate partner on close
  }

  const openDeleteModal = (corporate: CorporatePartner) => {
    setCorporateToDelete(corporate)
    setDeleteConfirmation(true)
  }

  const closeDeleteModal = () => {
    setDeleteConfirmation(false)
    setCorporateToDelete(null)
  }

  const handleDelete = () => {
    if (corporateToDelete) {
      axios
        .delete(`http://13.200.151.68:3000/api/corporate-partners/${corporateToDelete.id}`)
        .then(() => {
          setCorporates(corporates.filter((e) => e.id !== corporateToDelete.id))
          closeDeleteModal()
        })
        .catch((error) => {
          console.error('There was a problem deleting the corporate partner:', error)
        })
    }
  }

  return (
    <>
      <div className='card card-ab shadow-sm d-flex flex-row align-items-center justify-content-between p-5'>
        <div>
          <h1 className='fs-1'>Corporate Partner</h1>
          <em>companies and organization that dsu have partnership with</em>
        </div>

        {roleId === 1 && (
          <button className='btn btn-primary des' onClick={() => openModal(null)}>
            Add Corporate Partner
          </button>
        )}
      </div>

      {corporates.length > 0 ? (
        <div className='card card-ab mb-5 mb-xl-8 mt-8'>
          {/* <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Corporate Partners</span>
              <span className='text-muted mt-1 fw-semibold fs-7'>List of corporate partners</span>
            </h3>
          </div> */}
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bold text-muted'>
                    <th className='min-w-50px'>Sno</th>
                    <th className='min-w-200px'>Name</th>
                    <th className='min-w-150px'>Discount Offer</th>
                    <th className='min-w-150px'>Valid Date</th>
                    {roleId === 1 && <th className='min-w-100px'>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {corporates.map((corporate, index) => (
                    <tr key={corporate.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-50px me-5'>
                            <img
                              // src={`${Imageurl}${corporate.image}`}
                              src={`http://13.200.151.68:3000/corporate-partner/${
                                corporate.image || 'avatar.jpg'
                              }`}
                              alt={`${corporate.name}`}
                              className='img-fluid'
                              style={{maxHeight: '100px'}}
                            />
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <span className='text-dark fw-bold text-hover-primary fs-6'>
                              {corporate.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{corporate.discounted_offer}</td>
                      <td>{new Date(corporate.valid_date).toDateString()}</td>
                      {roleId === 1 && (
                        <td className='text-end'>
                          <div className='d-flex flex-shrink-0 gap-2'>
                            <Button
                              variant='primary'
                              size='sm'
                              onClick={() => openModal(corporate)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant='danger'
                              size='sm'
                              onClick={() => openDeleteModal(corporate)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className='container d-flex justify-content-center align-items-center'>
          <div className='mt-20 text-center'>
            <h1 className='fs-3'>No Corporate Partners</h1>
            <p className='fw-light'>new corporate partners will appear here</p>
          </div>
        </div>
      )}

      <CorporateModal
        isOpen={showModal}
        onClose={closeModal}
        selectedCorporate={selectedCorporate}
        fetchCorporates={fetchCorporates}
      />

      <Modal show={deleteConfirmation} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this corporate partner?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeDeleteModal}>
            No
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CorporatePartnerPage
