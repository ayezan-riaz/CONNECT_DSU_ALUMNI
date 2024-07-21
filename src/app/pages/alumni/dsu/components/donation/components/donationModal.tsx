import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const DonationModal: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    city: '',
    postalCode: '',
    contactNo: '',
    comments: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = Object.values(formData).every(value => value.trim() !== '');
    if (!isValid) {
      toast.error('Please fill out all fields.');
      return;
    }

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
    toast.success('Donation submitted successfully!');
  };

  return (
    <Card>
      <Card.Header style={{ backgroundColor: '#80171d', }}>
        <h4 style={{ marginTop: '20px', fontSize: '26px', fontWeight: '500', color: 'white' }}>Payment Details</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="amount">
            <Form.Label ><strong>Donation Amount</strong></Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="firstName">
            <Form.Label><strong>First Name</strong></Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label><strong>Last Name</strong></Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label><strong>Email</strong></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label><strong>Address</strong></Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label><strong>Country</strong></Form.Label>
            <Form.Control
              as="select"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value=""><strong>Select Country</strong></option>
              <option value="Pakistan">Pakistan</option>
              <option value="USA">USA</option>
              {/* Add more countries as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label><strong>Postal Code</strong></Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="contactNo">
            <Form.Label><strong>Contact No</strong></Form.Label>
            <Form.Control
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="comments">
            <Form.Label><strong>Comments</strong></Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DonationModal;
