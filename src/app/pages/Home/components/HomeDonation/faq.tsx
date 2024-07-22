import React, { useState } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import './faq.css';
import pay from '../../../../../app/pages/alumni/assets/payment.png';

const Faq: React.FC = () => {
    const [activeKey, setActiveKey] = useState<string | null>(null);

    const handleToggle = (key: string) => {
        setActiveKey(activeKey === key ? null : key);
    };

    return (
        <Card>
            <Card.Header style={{ backgroundColor: 'gray' }}>
                <h4 style={{ marginTop: '20px', color: 'white' }}>FAQ (Frequently Asked Questions)</h4>
            </Card.Header>
            <Card.Body>
                <Accordion activeKey={activeKey}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={() => handleToggle('0')}>Important Note</Accordion.Header>
                        <Accordion.Body>
                            <strong>Important Note:</strong> Please ensure that online transactions are enabled for debit/credit cards. If you are paying online, please insert the requested data accurately, as you have provided to your bank. If the data provided is incorrect, you will not be able to make a successful transaction. Additionally, kindly note that donations can only be made in local PKR currency.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header onClick={() => handleToggle('1')}>Is my Donation secure?</Accordion.Header>
                        <Accordion.Body>
                            Yes, your donation is secure.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header onClick={() => handleToggle('2')}>What is an Anonymous Donation?</Accordion.Header>
                        <Accordion.Body>
                            An anonymous donation is a donation made without revealing the donor's identity.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Card.Text className="mt-3">
                    For queries, please write to us at mail@dsu.edu.pk
                </Card.Text>
                <Card.Img variant="bottom" src={pay} alt="Payment Methods" />
            </Card.Body>
        </Card>
    );
};

export default Faq;
