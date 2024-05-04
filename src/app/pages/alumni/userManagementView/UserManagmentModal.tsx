import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';

interface User {
  id: number | '';
  email: string;
  uni_email: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  image: File | null;
  imageName: string;
}

interface UserManagementModalProps {
  closeModal: () => void;
  addUser: (newUser: User) => void;
  editUser: User | null;
  setEditUser: (user: User | null) => void;
  updateExistingUser: (user: User) => void;
}

const userAddSchema = Yup.object({
  first_name: Yup.string().required('First Name is required'),
  middle_name: Yup.string().required('Middle Name is required'),
  // last_name: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Wrong email format').required('Email is required'),
  uni_email: Yup.string()
    .email('Wrong email format')
    .matches(/^.+@dsu\.edu\.pk$/, 'Email domain must be dsu.edu.pk')
    .required('University Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues: User = {
  id: 0,
  email: '',
  uni_email: '',
  password: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  image: null,
  imageName: '',
};

const UserManagementModal: React.FC<UserManagementModalProps> = ({
  closeModal,
  addUser,
  editUser,
  setEditUser,
  updateExistingUser,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
    } else {
      return;
    }
  };

  const handleSubmit = (values: User) => {
    if (editUser && editUser.id) {
      // Perform update operation with the formData for the existing user
      const updatedUser: User = {
        ...editUser,
        email: values.email,
        uni_email: values.uni_email,
        password: values.password,
        first_name: values.first_name,
        middle_name: values.middle_name,
        last_name: values.last_name,
        image: selectedFile,
        imageName: selectedFile?.name || '',
      };

      setEditUser(updatedUser);
      updateExistingUser(updatedUser);
    } else {
      // Perform add operation with the formData for the new user
      const newUser: User = {
        id: Math.floor(Math.random() * 89) + 1,
        email: values.email,
        uni_email: values.uni_email,
        password: values.password,
        first_name: values.first_name,
        middle_name: values.middle_name,
        last_name: values.last_name,
        image: selectedFile,
        imageName: selectedFile?.name || '',
      };
      addUser(newUser);
    }

    // Reset the form data and close the modal
    setIsSubmitted(true);
    setSelectedFile(null);
    setTimeout(() => {
      setIsSubmitted(false);
      closeModal();
    }, 1000);
  };

  return (
    <>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={editUser || initialValues}
            validationSchema={userAddSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps: FormikProps<User>) => (
              <Form onSubmit={formikProps.handleSubmit}>
                {isSubmitted && (
                  <Alert variant="success">Form submitted successfully!</Alert>
                )}

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email</Form.Label>
                  <Field
                    type="text"
                    name="email"
                    className={`form-control ${formikProps.errors.email && formikProps.touched.email ? 'is-invalid' : ''
                      }`}
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </Form.Group>

                {/* Rest of the form fields */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>University Email</Form.Label>
                  <Field
                    type="email"
                    name="uni_email"
                    className={`form-control ${formikProps.errors.uni_email && formikProps.touched.uni_email
                      ? 'is-invalid'
                      : ''
                      }`}
                  />
                  <ErrorMessage name="uni_email" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Password</Form.Label>
                  <Field
                    type="password"
                    name="password"
                    className={`form-control ${formikProps.errors.password && formikProps.touched.password
                      ? 'is-invalid'
                      : ''
                      }`}
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>First Name</Form.Label>
                  <Field
                    type="text"
                    name="first_name"
                    className={`form-control ${formikProps.errors.first_name && formikProps.touched.first_name
                      ? 'is-invalid'
                      : ''
                      }`}
                  />
                  <ErrorMessage name="first_name" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Middle Name</Form.Label>
                  <Field
                    type="text"
                    name="middle_name"
                    className={`form-control ${formikProps.errors.middle_name && formikProps.touched.middle_name
                      ? 'is-invalid'
                      : ''
                      }`}
                  />
                  <ErrorMessage name="middle_name" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Last Name</Form.Label>
                  <Field
                    type="text"
                    name="last_name"
                    className={`form-control ${formikProps.errors.last_name && formikProps.touched.last_name
                      ? 'is-invalid'
                      : ''
                      }`}
                  />
                  <ErrorMessage name="last_name" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1" className="mb-3 my-3">
                  <Form.Label>Profile Image:   </Form.Label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="form-control-file"
                  />

                  {selectedFile && (
                    <div>
                      <p>Selected File: {selectedFile.name}</p>
                    </div>
                  )}
                </Form.Group>
                <div className="text-center">
                  <Button type="submit">Submit</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserManagementModal;
