import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import CorporateModal from './corporateModal'; // Import the CorporateModal component
import { CorporatePartner } from './corporatePartner'; // Import the CorporatePartner type
import './corporatePartner.css';
import { Link } from 'react-router-dom';

const CorporatePartnerPage: React.FC = () => {
  const [corporates, setCorporates] = useState<CorporatePartner[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCorporate, setSelectedCorporate] = useState<CorporatePartner | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [corporateToDelete, setCorporateToDelete] = useState<CorporatePartner | null>(null);
  const Imageurl = 'https://ams-backend-gkxg.onrender.com/api/corporate-partners/';

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

  const openModal = (corporate: CorporatePartner | null = null) => {
    setSelectedCorporate(corporate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCorporate(null); // Clear the selected corporate partner on close
  };

  const openDeleteModal = (corporate: CorporatePartner) => {
    setCorporateToDelete(corporate);
    setDeleteConfirmation(true);
  };

  const closeDeleteModal = () => {
    setDeleteConfirmation(false);
    setCorporateToDelete(null);
  };

  const handleDelete = () => {
    if (corporateToDelete) {
      axios
        .delete(`https://ams-backend-gkxg.onrender.com/api/corporate-partners/${corporateToDelete.id}`)
        .then(() => {
          setCorporates(corporates.filter((e) => e.id !== corporateToDelete.id));
          closeDeleteModal();
        })
        .catch((error) => {
          console.error('There was a problem deleting the corporate partner:', error);
        });
    }
  };

  return (
    <>
      <div className="row mb-5">
        <div className="col-3 offset-9">
          <button className="btn btn-primary des" onClick={() => openModal(null)}>
            Add new Corporate Partner
          </button>
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
                  <th className="min-w-200px">FACILITIES</th>
                  <th className="min-w-150px">Discount Offer</th>
                  <th className="min-w-150px">Valid Date</th>
                  <th className="min-w-100px text-end">Actions</th>
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
                    <td className="text-end">
                      <div className="d-flex justify-content-end flex-shrink-0">
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-1"
                          onClick={() => openModal(corporate)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => openDeleteModal(corporate)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
          <Button variant="secondary" onClick={closeDeleteModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CorporatePartnerPage;
