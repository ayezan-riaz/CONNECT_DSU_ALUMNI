import React from 'react';
import { Card, Accordion } from 'react-bootstrap';
import './FaqSection.css';

const FaqSection: React.FC = () => {
    return (
        <Card>
            <Card.Header style={{ backgroundColor: 'lightgray' }}>
                <h4 style={{ marginTop: '20px' }}>FAQ (Frequently Asked Questions)</h4>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>Important Note:</strong> Please ensure that online transactions are enabled for debit/credit cards. If you are paying online, please insert the requested data accurately, as you have provided to your bank. If the data provided is incorrect, you will not be able to make a successful transaction. Additionally, kindly note that donations can only be made in local PKR currency.
                </Card.Text>
                <Accordion defaultActiveKey="0" className="no-hover">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Is my Donation secure?</Accordion.Header>
                        <Accordion.Body>
                            Yes, your donation is secure.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>What is an Anonymous Donation?</Accordion.Header>
                        <Accordion.Body>
                            An anonymous donation is a donation made without revealing the donor's identity.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Card.Text className="mt-3">
                    For queries, please write to us at rm@dsu.edu.pk
                </Card.Text>
                <Card.Img variant="bottom" src="visa-mastercard-logos.png" alt="Payment Methods" />
            </Card.Body>
        </Card>
    );
};

export default FaqSection;
