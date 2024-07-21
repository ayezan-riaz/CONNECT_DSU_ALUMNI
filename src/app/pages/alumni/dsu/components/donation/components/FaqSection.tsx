import React, { useState } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import './FaqSection.css';
import pay from '../../../../assets/payment.png'
const FaqSection: React.FC = () => {
    const [activeKey, setActiveKey] = useState<string | null>('0');

    const handleToggle = (key: string) => {
        if (activeKey === key) {
            setActiveKey(null);
        } else {
            setActiveKey(key);
        }
    };

    return (
        <Card>
            <Card.Header style={{ backgroundColor: 'lightgray' }}>
                <h4 style={{ marginTop: '20px' }}>FAQ (Frequently Asked Questions)</h4>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>Important Note:</strong> Please ensure that online transactions are enabled for debit/credit cards. If you are paying online, please insert the requested data accurately, as you have provided to your bank. If the data provided is incorrect, you will not be able to make a successful transaction. Additionally, kindly note that donations can only be made in local PKR currency.
                </Card.Text>
                <Accordion activeKey={activeKey}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={() => handleToggle('0')}>Is my Donation secure?</Accordion.Header>
                        <Accordion.Body>
                            Yes, your donation is secure.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header onClick={() => handleToggle('1')}>What is an Anonymous Donation?</Accordion.Header>
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

export default FaqSection;
