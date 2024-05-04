import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import UserManagementModal from './UserManagmentModal';

interface User {
    id: number;
    email: string;
    uni_email: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    image: File | null;
    imageName: string;
}

const API_BASE_URL = 'https://amsbackend-ghub.onrender.com';

const fetchUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
};

const addUser = async (newUser: any) => {
    const response = await axios.post(`${API_BASE_URL}/users`, newUser);
    return response.data;
};

const editUser = async (userId: number, updatedUser: any) => {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, updatedUser);
    return response.data;
};

const deleteUser = async (userId: number) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
    return response.data;
};

const UserManagementList: React.FC = () => {
    const [editUser, setEditUser] = useState<any>({});
    const [searchText, setSearchText] = useState('');
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);

    const { data: users = [] } = useQuery('users', fetchUsers);

    const addUserMutation = useMutation(addUser, {
        onSuccess: (data) => {
            queryClient.setQueryData('users', (prevData: any) => [...prevData, data]);
            closeModal();
        },
    });

    const updateUser = async (userId: number, updatedUser: User) => {
        try {
            await editUser(userId, updatedUser); // Call the API function to update the user
            // If the update is successful, update the local data using React Query's setQueryData
            queryClient.setQueryData('users', (prevData: any) => {
                const updatedUsers = prevData.map((user: User) => {
                    if (user.id === userId) {
                        return { ...user, ...updatedUser };
                    }
                    return user;
                });
                return updatedUsers;
            });
            closeModal();
        } catch (error) {
            // Handle any error that may occur during the update process
            console.error('Error updating user:', error);
        }
    };



    const editUserMutation = useMutation(editUser, {
        onSuccess: (data: any, userId: number) => {
            queryClient.setQueryData('users', (prevData: any) => {
                const updatedUsers = prevData.map((user: any) => {
                    if (user.id === userId) {
                        return { ...user, ...data };
                    }
                    return user;
                });
                return updatedUsers;
            });
            closeModal();
        },
    });

    const deleteUserMutation = useMutation(deleteUser, {
        onSuccess: (data, userId) => {
            queryClient.setQueryData('users', (prevData: any) => {
                const updatedUsers = prevData.filter((user: any) => user.id !== userId);
                return updatedUsers;
            });
        },
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleEditUser = (userId: number) => {
        const userToUpdate = users.find((user: User) => user.id === userId);

        if (userToUpdate) {
            setEditUser(userToUpdate);
            openModal();
        }
    };

    const handleDeleteUser = (userId: number) => {
        deleteUserMutation.mutate(userId);
    };

    const handleAddUser = (newUser: any) => {
        addUserMutation.mutate(newUser);
    };

    const updateExistingUser = (updatedUser: any) => {
        const userId = updatedUser.id;
        editUserMutation.mutate(updatedUser, { onSuccess: () => handleEditUser(userId) });
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditUser({});
    };

    return (

        <div className='card'>
            <div>
                {/* <input
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={handleSearchChange}
                /> */}
                <div className='card-header border-0 pt-6'>
                    {/*begin::Card title*/}
                    <div className='card-title'>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/*begin::Search*/}
                            <div className='d-flex align-items-center position-relative my-1'>
                                <i className='ki-duotone ki-magnifier fs-3 position-absolute ms-5'>
                                    <span className='path1' />
                                    <span className='path2' />
                                </i>
                                <input
                                    type='text'
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    className='form-control form-control-solid w-250px ps-13'
                                    placeholder='Search user'
                                    list='suggestionsList'
                                />
                            </div>
                            {/*end::Search*/}



                            <div>
                                <button type="button" className="btn but_brown" onClick={openModal}>
                                    <i className="ki-duotone ki-plus fs-2" />
                                    Add User
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='card-body py-4'>
                <div className='table-responsive'>

                    <table
                        id='kt_table_users'
                        className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                        role='table'
                    >
                        {/* Table Header */}
                        <thead>
                            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                                {/* Checkbox */}
                                <th colSpan={1} role='columnheader' className='w-10px pe-2'>
                                    <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            data-kt-check='false'
                                            data-kt-check-target='#kt_table_users .form-check-input'
                                        />
                                    </div>
                                </th>
                                {/* User */}
                                <th colSpan={1} role='columnheader' className='min-w-100px' style={{ cursor: 'pointer' }}>
                                    USER
                                </th>
                                {/* University Email */}
                                <th colSpan={1} role='columnheader' className='min-w-125px' style={{ cursor: 'pointer' }}>
                                    UNIVERSITY EMAIL
                                </th>
                                {/* Password */}
                                <th colSpan={1} role='columnheader' className='min-w-125px' style={{ cursor: 'pointer' }}>
                                    PASSWORD
                                </th>
                                {/* Image Name */}
                                <th colSpan={1} role='columnheader' className='min-w-125px' style={{ cursor: 'pointer' }}>
                                    IMAGE NAME
                                </th>
                                {/* Actions */}
                                <th colSpan={1} role='columnheader' className='text-end min-w-100px' style={{ cursor: 'pointer' }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className='text-gray-600 fw-bold' role='rowgroup'>
                            {users
                                .filter((user: User) => user.first_name.toLowerCase().includes(searchText.toLowerCase()))
                                .map((user: User) => (
                                    <tr key={user.id} role='row'>
                                        {/* Checkbox */}
                                        <td role='cell' className=''>
                                            <div className='form-check form-check-custom form-check-solid'>
                                                <input
                                                    className='form-check-input'
                                                    type='checkbox'
                                                    data-kt-check='false'
                                                    data-kt-check-target='#kt_table_users .form-check-input'
                                                />
                                            </div>
                                        </td>
                                        {/* User details */}
                                        <td className='d-flex align-items-center'>
                                            {/* Avatar */}
                                            <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                                <a href='viewuser'>
                                                    <div className='symbol-label'>
                                                        {user.image && (
                                                            <img className='w-100' src={URL.createObjectURL(user.image)} alt={user.imageName} />
                                                        )}
                                                    </div>
                                                </a>
                                            </div>
                                            {/* User details */}
                                            <div className='d-flex flex-column'>
                                                <a href='viewuser' className='text-gray-800 text-hover-primary mb-1'>
                                                    {user.first_name} {user.middle_name} {user.last_name}
                                                </a>
                                                <span>{user.email}</span>
                                            </div>
                                        </td>
                                        {/* University Email */}
                                        <td role='cell' className=''>
                                            {user.uni_email}
                                        </td>
                                        {/* Password */}
                                        <td role='cell' className=''>
                                            {user.password}
                                        </td>
                                        {/* Image Name */}
                                        <td role='cell' className=''>
                                            {user.imageName}
                                        </td>
                                        {/* Actions */}
                                        <td role='cell' className='text-end'>
                                            <button
                                                type='button'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                                data-bs-toggle='modal'
                                                data-bs-target='#kt_modal_upgrade_plan'
                                                onClick={() => handleEditUser(user.id)}
                                            >
                                                Edit
                                                <i className='flaticon2-edit' />
                                            </button>
                                            <button
                                                type='button'
                                                className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                Delete
                                                <i className='flaticon-delete' />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className='d-flex justify-content-end'>
                        <div className='dataTables_paginate paging_simple_numbers' id='kt_table_users_paginate'>
                            <ul className='pagination'>
                                <li className='paginate_button page-item previous disabled' id='kt_table_users_previous'>
                                    <a href='#' aria-controls='kt_table_users' data-dt-idx='0' tabIndex={0} className='page-link'>
                                        <i className='previous' />
                                    </a>
                                </li>
                                <li className='paginate_button page-item active'>
                                    <a href='#' aria-controls='kt_table_users' data-dt-idx='1' tabIndex={0} className='page-link'>
                                        1
                                    </a>
                                </li>
                                <li className='paginate_button page-item next' id='kt_table_users_next'>
                                    <a href='#' aria-controls='kt_table_users' data-dt-idx='2' tabIndex={0} className='page-link'>
                                        <i className='next' />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {
                // showModal && (
                // <UserManagementModal
                // showModal={showModal}
                // closeModal={closeModal}
                // addUser={handleAddUser}
                // editUser={updateUser} // Use the renamed function here
                // user={editUser}
                // />
                // )
            }
        </div>
    );
};

export default UserManagementList;


function handleEditUser(userId: number) {
    throw new Error('Function not implemented.');
}

