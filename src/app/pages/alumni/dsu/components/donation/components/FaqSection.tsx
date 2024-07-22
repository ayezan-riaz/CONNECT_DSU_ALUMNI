import React, {useState} from 'react'
import {Card, Accordion} from 'react-bootstrap'
import './FaqSection.css'
import pay from '../../../../assets/payment.png'

const FaqSection: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const handleToggle = (key: string) => {
    setActiveKey(activeKey === key ? null : key)
  }

  return (
    <Card>
      <Card.Header style={{backgroundColor: 'gray'}}>
        <h4 style={{marginTop: '20px', color: 'white'}}>FAQ (Frequently Asked Questions)</h4>
      </Card.Header>
      <Card.Body>
        <Accordion activeKey={activeKey}>
          <Accordion.Item eventKey='0'>
            <Accordion.Header onClick={() => handleToggle('0')}>
              <h6>Important Note</h6>
            </Accordion.Header>
            <Accordion.Body>
              Please ensure that online transactions are enabled for your debit/credit cards. If you
              are paying online, please insert the requested data accurately, as you have provided
              to your bank. If the data provided is incorrect, you will not be able to make a
              successful transaction. Additionally, kindly note that donations can only be made in
              local PKR currency.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header onClick={() => handleToggle('1')}>
              <h6>Is my Donation secure?</h6>
            </Accordion.Header>
            <Accordion.Body>Yes, your donation is secure with end-to-end encryption</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='2'>
            <Accordion.Header onClick={() => handleToggle('2')}>
              <h6>What is an Anonymous Donation?</h6>
            </Accordion.Header>
            <Accordion.Body>
              An anonymous donation is a donation made without revealing the donor's identity.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Card.Text className='mt-5'>
          For queries, please write to us at <span className='fw-bold'>alumni@dsu.edu.pk</span>
        </Card.Text>
        <Card.Img variant='bottom' className='mt-5' src={pay} alt='Payment Methods' />
      </Card.Body>
    </Card>
  )
}

export default FaqSection
