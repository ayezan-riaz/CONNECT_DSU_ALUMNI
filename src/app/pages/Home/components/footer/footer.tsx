import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer bg">
            <Container>
                <Row className="justify-content-between align-items-center">
                    <Col md={6} className="text-center text-md-left">
                        <p className="mb-0 text-white">
                            &copy; All Rights Reserved. Iqra University - Alumni Portal
                        </p>
                    </Col>
                    <Col md={6} className="text-center text-md-right">
                        <a href="/home" className="text-white mx-2">Home</a>
                        <a href="/about" className="text-white mx-2">About IU</a>
                        <a href="/contact" className="text-white mx-2">Contact Us</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
