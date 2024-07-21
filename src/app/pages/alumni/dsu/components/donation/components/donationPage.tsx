import React from 'react';
import DonationModal from './donationModal';
import FaqSection from './FaqSection';
import { Row, Col, Container } from 'react-bootstrap';

const DonationPage: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <DonationModal />
        </Col>
        <Col md={4}>
          <FaqSection />
        </Col>
      </Row>
    </Container>
  );
};

export default DonationPage;
