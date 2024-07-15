import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { AlumniCard } from './cardTypes';
import { Button, Table, Form, Alert } from 'react-bootstrap';
import './card.css';

const CardPage: React.FC = () => {
  const [alumniCards, setAlumniCards] = useState<AlumniCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<AlumniCard[]>([]);
  const [role, setRole] = useState<number | null>(null);
  const [searchField, setSearchField] = useState<string>('name');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const userId = parseInt(localStorage.getItem('sub') || '0', 10);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRole(parseInt(userRole, 10));
    }
  }, []);

  useEffect(() => {
    if (role === 1) {
      fetchAlumniCards();
    } else if (role === 2) {
      checkUserApprovalStatus();
    }
  }, [role]);

  const fetchAlumniCards = () => {
    axios.get('https://ams-backend-gkxg.onrender.com/api/alumni-card')
      .then(response => {
        setAlumniCards(response.data);
        setFilteredCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching alumni cards:', error);
      });
  };

  const checkUserApprovalStatus = () => {
    axios.get(`https://ams-backend-gkxg.onrender.com/api/alumni-card/user/${userId}`)
      .then(response => {
        if (response.data && response.data.isApproved) {
          setIsApproved(true);
        } else {
          setIsApproved(false);
        }
      })
      .catch(error => {
        console.error('Error checking approval status:', error);
      });
  };

  const handleApply = () => {
    if (userId) {
      axios.post('https://ams-backend-gkxg.onrender.com/api/alumni-card', { userId })
        .then(response => {
          console.log('Application submitted successfully');
          checkUserApprovalStatus(); // Refresh the approval status after applying
        })
        .catch(error => {
          console.error('Error applying for alumni card:', error);
        });
    }
  };

  const handleApprove = (cardId: number) => {
    const token = localStorage.getItem('token');
    axios.post(`https://ams-backend-gkxg.onrender.com/api/alumni-card/approve/${cardId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        fetchAlumniCards(); // Refresh the list after approval
        console.log('Card approved successfully');
      })
      .catch(error => {
        console.error('Error approving card:', error);
      });
  };

  const handleSearch = useCallback(() => {
    if (searchQuery === '') {
      setFilteredCards(alumniCards);
    } else {
      const filtered = alumniCards.filter(card => {
        return card[searchField as keyof AlumniCard].toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredCards(filtered);
    }
  }, [searchQuery, searchField, alumniCards]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="container">
      {role === 2 && isApproved === false && (
        <div className="apply-card">
          <Button variant="primary" onClick={handleApply}>
            Apply For Alumni Card
          </Button>
        </div>
      )}

      {role === 2 && isApproved === true && (
        <Alert variant="success">
          Your alumni card has been approved. Please collect it from the registration office.
        </Alert>
      )}

      {role === 1 && (
        <>
          <div className="row mb-3">
            <div className="col-3">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-3">
              <Form.Select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="rollNumber">Roll Number</option>
                <option value="uniEmail">University Email</option>
              </Form.Select>
            </div>
          </div>
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">Alumni Cards</span>
                <span className="text-muted mt-1 fw-semibold fs-7">List of alumni card applications</span>
              </h3>
            </div>
            <div className="card-body py-3">
              <div className="table-responsive">
                <Table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                  <thead>
                    <tr className="fw-bold text-muted">
                      <th className="min-w-50px">Sno</th>
                      <th className="min-w-200px">Name</th>
                      <th className="min-w-150px">Roll Number</th>
                      <th className="min-w-150px">University Email</th>
                      <th className="min-w-100px">Status</th>
                      <th className="min-w-100px text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCards.map((card, index) => (
                      <tr key={card.id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              <span className="text-dark fw-bold text-hover-primary fs-6">
                                {card.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{card.rollNumber}</td>
                        <td>{card.uniEmail}</td>
                        <td>{card.isApproved ? 'Approved' : 'Pending'}</td>
                        <td className="text-end">
                          <div className="d-flex justify-content-end flex-shrink-0">
                            {!card.isApproved && (
                              <Button
                                variant="success"
                                size="sm"
                                className="me-1"
                                onClick={() => handleApprove(card.id)}
                              >
                                Approve
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CardPage;
