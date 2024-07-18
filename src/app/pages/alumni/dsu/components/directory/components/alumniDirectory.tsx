import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import AlumniDirectoryModal from './alumniDirectoryModal'; // Import the UserModal component
import { Users } from './alumniDirectoryTypes'; // Import the Directory type
import './alumniDirectory.css';

const AlumniDirectory: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Users | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewUser, setViewUser] = useState<Users | null>(null); // State for viewing user details
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const Imageurl = 'https://ams-backend-gkxg.onrender.com/api/alumni/';
  const loggedInUserId = parseInt(localStorage.getItem('sub') || '0', 10);

  const fetchUsers = () => {
    axios
      .get<Users[]>('https://ams-backend-gkxg.onrender.com/api/users/directory')
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with all users
      })
      .catch((error) => {
        console.error('There was a problem fetching the users data:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, filterRole, users]);

  const filterUsers = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter((user) =>
        `${user.first_name} ${user.middle_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (filterRole !== 'All') {
      filtered = filtered.filter((user) =>
        filterRole === 'Admin' ? user.role === 1 : user.role === 2
      );
    }

    // Exclude users with roleId 1 and logged-in user's data
    filtered = filtered.filter((user) => user.role !== 1 && user.id !== loggedInUserId);

    setFilteredUsers(filtered);
  };

  const openModal = (user: Users | null, admin: boolean) => {
    setSelectedUser(user);
    setShowModal(true);
    setIsAdmin(admin); // Set isAdmin based on the button clicked
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openDeleteModal = (user: Users) => {
    setUserToDelete(user);
    setDeleteConfirmation(true);
  };

  const closeDeleteModal = () => {
    setDeleteConfirmation(false);
    setUserToDelete(null);
  };

  const handleDelete = () => {
    if (userToDelete) {
      axios
        .delete(`https://ams-backend-gkxg.onrender.com/api/users/${userToDelete.id}`)
        .then(() => {
          setUsers(users.filter((e) => e.id !== userToDelete.id));
          closeDeleteModal();
        })
        .catch((error) => {
          console.error('There was a problem deleting the user:', error);
        });
    }
  };

  const openViewUserModal = (user: Users) => {
    setViewUser(user);
  };

  const closeViewUserModal = () => {
    setViewUser(null);
  };

  return (
    <>
      <div className='row flex-nowrap mb-3 mt-5'>
        <div className='col-md-3'>
          <Form.Control
            type='text'
            placeholder='Search by name'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='col-md-2 '>
          <Form.Select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value='All'>All</option>
            <option value='Admin'>Admin</option>
            <option value='User'>User</option>
          </Form.Select>
        </div>
        <div className='d-flex gap-5'>
          <div>
            <button className='btn btn-primary des' onClick={() => openModal(null, false)}>
              Add new user
            </button>
          </div>
          <div>
            <button className='btn btn-primary des' onClick={() => openModal(null, true)}>
              Add new admin
            </button>
          </div>
        </div>
      </div>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Users</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>List of users</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-50px'>Sno</th>
                  <th className='min-w-200px'>Name</th>
                  <th className='min-w-150px'>Email</th>
                  <th className='min-w-150px'>University Email</th>
                  <th className='min-w-150px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-50px me-5'>
                          <img
                            src={`https://ams-backend-gkxg.onrender.com/alumni/${
                              user.avatar || 'default-avatar.png'
                            }`}
                            alt={`${user.first_name} ${user.last_name}`}
                          />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <span className='text-dark fw-bold text-hover-primary fs-6'>
                            {`${user.first_name} ${user.middle_name} ${user.last_name}`}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.uni_email}</td>

                    <td className='text-end'>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <Button
                          variant='primary'
                          size='sm'
                          className='me-1'
                          onClick={() => openModal(user, false)}
                        >
                          Edit
                        </Button>
                        <Button variant='danger' size='sm' onClick={() => openDeleteModal(user)}>
                          Delete
                        </Button>
                        <Button
                          variant='info'
                          size='sm'
                          className='me-1'
                          onClick={() => openViewUserModal(user)}
                        >
                          View
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

      <AlumniDirectoryModal
        isOpen={showModal}
        onClose={closeModal}
        selectedUser={selectedUser}
        fetchUsers={fetchUsers}
        isAdmin={isAdmin} // Pass isAdmin prop
      />

      <Modal show={deleteConfirmation} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeDeleteModal}>
            No
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {viewUser && (
  <Modal show={viewUser !== null} onHide={closeViewUserModal}>
    <Modal.Header closeButton>
      <Modal.Title>User Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <img
              src={`https://ams-backend-gkxg.onrender.com/alumni/${viewUser.avatar || 'default-avatar.png'}`}
              alt={`${viewUser.first_name} ${viewUser.last_name}`}
              className="img-fluid rounded-circle"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <div className="ms-3">
              <h5 className="mb-0">{`${viewUser.first_name} ${viewUser.middle_name} ${viewUser.last_name}`}</h5>
            </div>
          </div>
          <div className="user-details">
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>University Email:</strong> {viewUser.uni_email}</p>
            <p><strong>Phone:</strong> {viewUser.phone}</p>
            <p><strong>Number of Jobs Posted:</strong> {viewUser.noOfJobsPosted}</p>
            <p><strong>Designation:</strong> {viewUser.designation}</p>
            <p><strong>Qualification:</strong> {viewUser.qualification}</p>
            <p><strong>Company:</strong> {viewUser.company}</p>
          </div>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeViewUserModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
)}

    </>
  );
};

export default AlumniDirectory;
