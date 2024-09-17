import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 footer">
            <Container>
                {/* Row 1: Footer Links */}
                <Row>
                    <Col md={3} className="mb-4">
                        <h5 className="text-uppercase">About Us</h5>
                        <p>
                            We are a blog website focused on delivering high-quality content in various domains, keeping readers informed, and providing valuable insights.
                        </p>
                    </Col>

                    <Col md={3} className="mb-4">
                        <h5 className="text-uppercase">Quick Links</h5>
                        <ul className="list-unstyled">
                            <LinkContainer to="/"><li><a href="/" className="text-white">Home</a></li></LinkContainer>
                            <li><a href="/blogs" className="text-white">Blogs</a></li>
                            <li><a href="/contact" className="text-white">Contact</a></li>
                        </ul>
                    </Col>

                    <Col md={3} className="mb-4">
                        <h5 className="text-uppercase">Contact Us</h5>
                        <ul className="list-unstyled">
                            <li><i className="fas fa-map-marker-alt"></i> Hamirpur,Himachal Pradesh,India</li>
                            <li><i className="fas fa-envelope"></i> pathanian708@gmail.com</li>
                        </ul>
                    </Col>

                    <Col md={3} className="mb-4">
                        <h5 className="text-uppercase">Subscribe</h5>
                        <Form>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Subscribe</Button>
                        </Form>
                    </Col>
                </Row>

                {/* Row 2: Social Media Icons */}
                <Row className="text-center mt-3">
                    <Col>
                        <a href="#" className="text-white me-3">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://pin.it/3AlScE7rp`" className="text-white me-3">
                            <i className="fab fa-pinterest"></i>
                        </a>
                        <a href="https://www.instagram.com/neeraj209__?igsh=Mm95ZXk1cTJ6bWc1&utm_source=qr" className="text-white me-3">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-white me-3">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </Col>
                </Row>

                {/* Row 3: Copyright */}
                <Row className="text-center mt-4">
                    <Col>
                        <p className="mb-0">&copy; 2024 BlogSite. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
