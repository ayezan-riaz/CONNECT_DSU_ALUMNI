import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer bg">
            <Container>
                <Row className="justify-content-between align-items-center">
                    <Col md={6} className="text-center text-md-left">
                        <p className="mb-0 text-white">
                            &copy; All Rights Reserved. DHA Suffa University - Alumni Portal
                        </p>
                    </Col>
                    <Col md={6} className="text-center text-md-right">
                        <Link to='/home' className="text-white mx-2">Home</Link>

                        <a className="text-white mx-2" href='https://www.dsu.edu.pk/about-us/' rel='noopener noreferrer'>
                            About IU
                        </a>
                        <a className="text-white mx-2" href='https://www.dsu.edu.pk/contact-us/' rel='noopener noreferrer'>
                            Contact Us
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
