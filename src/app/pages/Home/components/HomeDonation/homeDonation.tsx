
import React from 'react';
import HomeDonationModel from './homeDonationModel';
import Faq from './faq';
import { Row, Col, Container } from 'react-bootstrap';
import './homeDonation.css'
const HomeDonation: React.FC = () => {
  return (
    <Container>
      {/* <h1>Donate to DHA Suffa</h1> */}
      <Row>
        <h1 className='h1_st' >Donate to DHA Suffa</h1>
        <Col md={8}>
          <HomeDonationModel />
        </Col>
        <Col md={4}>
          <Faq />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeDonation;
