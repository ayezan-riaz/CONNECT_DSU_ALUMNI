import React, {useEffect, useState, useCallback} from 'react'
import axios from 'axios'
import {AlumniCard} from './cardTypes'
import {Button, Table, Form, Alert} from 'react-bootstrap'
import './card.css'
import {toast} from 'react-toastify'
import {useLocation} from 'react-router-dom'

const CardPage: React.FC = () => {
  const [alumniCards, setAlumniCards] = useState<AlumniCard[]>([])
  const [filteredCards, setFilteredCards] = useState<AlumniCard[]>([])
  const [role, setRole] = useState<number | null>(null)
  const [count, setCount] = useState<number>(0)
  const [searchField, setSearchField] = useState<string>('name')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const userId = parseInt(localStorage.getItem('sub') || '0', 10)
  const [isApproved, setIsApproved] = useState<boolean | null>(null)
  const [isRequested, setIsRequested] = useState<boolean | null>(null)
  const [userHasCard, setUserHasCard] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    const userRole = localStorage.getItem('role')
    if (userRole) {
      setRole(parseInt(userRole, 10))
    }
  }, [])

  useEffect(() => {
    setCount((prev) => prev + 1)
  }, [location])

  useEffect(() => {
    fetchAlumniCards()
  }, [count])

  const fetchAlumniCards = () => {
    axios
      .get('http://13.200.151.68:3000/api/alumni-card')
      .then((response) => {
        setAlumniCards(response.data)
        setFilteredCards(response.data)
        if (role === 2) {
          console.log(alumniCards)
          const userCard = response.data.find((card: AlumniCard) => card.user.id === userId)
          if (userCard) {
            setUserHasCard(true)
            setIsApproved(userCard.isApproved)
            setIsRequested(userCard.isRequested)
          } else {
            setUserHasCard(false)
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching alumni cards:', error)
      })
  }

  const handleApply = () => {
    if (userId) {
      axios
        .post(`http://13.200.151.68:3000/api/alumni-card/${userId}`)
        .then((response) => {
          console.log('Application submitted successfully')
          fetchAlumniCards() // Refresh the cards after applying
        })
        .catch((error) => {
          console.error('Error applying for alumni card:', error)
        })
    }
  }

  const handleApprove = (cardId: number) => {
    const token = localStorage.getItem('token')
    axios
      .post(
        `http://13.200.151.68:3000/api/alumni-card/approve/${cardId}`,
        {},
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      )
      .then((response) => {
        fetchAlumniCards() // Refresh the list after approval
        toast.success('Alumni card approved')
        console.log('Card approved successfully')
      })
      .catch((error) => {
        toast.error('Cannot approve alumni card')
        console.error('Error approving card:', error)
      })
  }

  const handleSearch = useCallback(() => {
    if (searchQuery === '') {
      setFilteredCards(alumniCards)
    } else {
      const filtered = alumniCards.filter((card) => {
        const user = card.user
        const searchValue = user[searchField as keyof typeof user].toString().toLowerCase()
        return searchValue.includes(searchQuery.toLowerCase())
      })
      setFilteredCards(filtered)
    }
  }, [searchQuery, searchField, alumniCards])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  return (
    <div>
      {role === 2 && (
        <div className='card card-ab shadow-sm d-flex flex-row m-0  justify-content-between p-5'>
          <div>
            <h1 className='fs-1'>Alumni Card</h1>
            <em>
              You will be entitled to certain benefits which can be availed with the help of Alumni
              Card
            </em>
            <ul className='mt-2'>
              <li className='text-lowercase'>FACILITATION OF ENTRY INTO DSU PREMISES</li>
              <li className='text-lowercase'>
                ACCESS TO UNIVERSITY RESOURCES LIKE LIBRARY AND SPORTS FACILITIES
              </li>
              <li className='text-lowercase'>
                DISCOUNTED REGISTRATION FEE FOR VARIOUS ALUMNI EVENTS
              </li>
            </ul>
          </div>

          {role === 2 && !userHasCard && !isRequested && !isApproved && (
            <div className='apply-card'>
              <Button variant='primary' onClick={handleApply}>
                Apply For Alumni Card
              </Button>
            </div>
          )}
        </div>
      )}

      {role === 2 && userHasCard && isRequested && !isApproved && (
        <Alert className='mt-12 col-6' variant='info'>
          Your alumni card has been request, kindly wait until approval.
        </Alert>
      )}

      {role === 2 && userHasCard && isRequested && isApproved && (
        <Alert className='mt-12 col-6' variant='success'>
          Your alumni card has been approved. You can collect it from the Alumni Department.
        </Alert>
      )}

      {role === 1 && (
        <>
          <div className='card m-0 card-ab d-flex flex-row p-5 gap-3 shadow-sm mb-5'>
            <div className='col-3'>
              <Form.Control
                type='text'
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className='col-3'>
              <Form.Select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                <option value='first_name'>First Name</option>
                <option value='last_name'>Last Name</option>
                <option value='roll_no'>Roll Number</option>
                <option value='uni_email'>University Email</option>
              </Form.Select>
            </div>
          </div>
          <div className='card card-ab shadow-sm mb-xl-8 m-0'>
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-1 mb-1'>Requested Alumni Cards</span>
                <span className='text-muted mt-1 fw-semibold fs-7'>
                  List of alumni card applications
                </span>
              </h3>
            </div>
            <div className='card-body py-3'>
              <div className='table-responsive'>
                <Table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                  <thead>
                    <tr className='fw-bold text-muted'>
                      <th className='min-w-50px'>Sno</th>
                      <th className='min-w-200px'>Name</th>
                      <th className='min-w-150px'>Roll Number</th>
                      <th className='min-w-150px'>University Email</th>
                      <th className='min-w-100px'>Status</th>
                      <th className='min-w-100px'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCards
                      .filter((card) => card.isRequested)
                      .map((card, index) => (
                        <tr key={card.id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex justify-content-start flex-column'>
                                <span className='text-dark fw-bold text-hover-primary fs-6'>
                                  {card.user.first_name} {card.user.last_name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>{card.user.roll_no}</td>
                          <td>{card.user.uni_email}</td>
                          <td>{card.isApproved ? 'Approved' : 'Pending'}</td>
                          <td className='text-end'>
                            <div className='d-flex flex-shrink-0'>
                              {!card.isApproved && (
                                <Button
                                  variant='success'
                                  size='sm'
                                  className='me-1'
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
  )
}

export default CardPage
