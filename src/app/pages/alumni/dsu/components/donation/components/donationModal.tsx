import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Form, Button, InputGroup, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './donation.css'; // Import your CSS file

const DonationModal: React.FC = () => {
  const [formData, setFormData] = useState({
    paymentMethod: 'online',
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

  const handlePaymentMethodChange = (value: string) => {
    setFormData({
      ...formData,
      paymentMethod: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = Object.values(formData).every(value => value.trim() !== '') && parseFloat(formData.amount) > 0;
    if (!isValid) {
      toast.error('Please fill out all fields correctly.');
      return;
    }

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
    toast.success('Donation submitted successfully!');
    // Clear form
    setFormData({
      paymentMethod: 'online',
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
  };

  return (
    <Card>
      <Card.Header style={{ backgroundColor: '#80171d' }}>
        <h4 style={{ marginTop: '20px', fontSize: '26px', fontWeight: '500', color: 'white' }}>Payment Details</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="paymentMethod" className="form-inline">
            <Form.Label className="mr-2">
              <strong>Payment Methods <span className="text-danger">*</span></strong>
            </Form.Label>
            <ToggleButtonGroup
              type="radio"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <ToggleButton variant="outline-dark" value="online">Online</ToggleButton>
              <ToggleButton variant="outline-white" value="accountDeposits">Account Deposits</ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>
          <Form.Group controlId="amount" className="form-inline">
            <Form.Label className="mr-2">
              <strong>Donation Amount <span className="text-danger">*</span></strong>
            </Form.Label>
            <InputGroup>
              <InputGroup.Text as="select" className="form-select-sm">
                <option value="PKR">PKR</option>
                {/* Add more currencies as needed */}
              </InputGroup.Text>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
                min="1"
              />
            </InputGroup>
          </Form.Group>
          <hr></hr>
          <Form.Group controlId="firstName" className="form-inline">
            <Form.Label className="mr-2">
              <strong>First Name <span className="text-danger">*</span></strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="form-inline">
            <Form.Label className="mr-2">
              <strong>Last Name <span className="text-danger">*</span></strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="form-inline">
            <Form.Label className="mr-2">
              <strong>Email <span className="text-danger">*</span></strong>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </Form.Group>
          <hr></hr>
          <Form.Group controlId="address" className="form-inline">
            <Form.Label className="mr-2">
              <strong>Address <span className="text-danger">*</span></strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </Form.Group>
          <Form.Group controlId="country" className="form-inline">
            <Form.Label className="mr-2">
              <strong>Country <span className="text-danger">*</span></strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              <option value="Pakistan">Pakistan</option>
              {/* Add more countries as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="city" className="form-inline">
            <Form.Label className="mr-2">
              <strong>City <span className="text-danger">*</span></strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
          </Form.Group>
          <Form.Group controlId="postalCode" className="form-inline">
            <Form.Label className="mr-2">
              <strong>Postal Code <span className="text-danger">*</span></strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
              required
            />
          </Form.Group>
          <Form.Group controlId="contactNo" className="form-inline">
            <Form.Label className="mr-2">
              <strong>Contact No <span className="text-danger">*</span></strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
            />
          </Form.Group>
          <Form.Group controlId="comments" className="form-inline">
            <Form.Label className="mr-2">
              <strong>Comments <span className="text-danger">*</span></strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Enter comments"
              required
            />
          </Form.Group>
          <hr></hr>
          <Button variant="primary" type="submit" style={{ float: 'right' }}>Submit</Button>
        </Form>
        <ToastContainer />
      </Card.Body>
    </Card>
  );
};

export default DonationModal;
