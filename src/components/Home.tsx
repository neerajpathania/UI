// HomePage.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getPosts } from '../services/slices/components/blogs';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const data: any[] = useSelector((state: any) => state.Post?.posts) || []
    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [show, setShow] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")

    const handleReadMore = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index)
    }

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleExplore = () => {
        const queryParams = new URLSearchParams({ category: selectedCategory || "All" }).toString()
        navigate(`/posts?${queryParams}`)
    }


    useEffect(() => {
        dispatch(getPosts()).catch((error: any) =>
            console.error("Failed to fetch reports", error)
        )
    }, [dispatch])


    const latestPosts = Array.isArray(data) ? data.slice().reverse().slice(0, 6) : [];

    return (
        <div>
            {/* Navigation Bar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">My Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>Home</Nav.Link>
                            <LinkContainer to='/create'><Nav.Link>Create</Nav.Link></LinkContainer>
                            <LinkContainer to='/profile'><Nav.Link>Profile</Nav.Link></LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <div className="hero">
                <h1>Inspiring Creativity and Innovation</h1>
                <Button variant="light" size="lg" onClick={handleShow}>Explore</Button>
            </div>

            {/* Recent Posts */}

            <Container className="mt-4">
                <Row>
                    <Col>
                        <h1 className="text-center mb-4">Latest Blogs</h1>
                    </Col>
                </Row>
                <Row>
                    {latestPosts.length > 0 ? (
                        latestPosts.map((item: any, index: any) => {
                            const isExpanded = expandedIndex === index;
                            return (
                                <Col key={index} md={4} className="mb-4">
                                    <Card>
                                        <Card.Img variant="top" src={item?.image} alt="Blog Image" />
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text className={isExpanded ? 'expanded' : 'collapsed'}>
                                                {item.content}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => handleReadMore(index)}>
                                                {isExpanded ? 'Read Less' : 'Read More'}
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    ) : (
                        <p>No blogs available.</p>
                    )}
                </Row>

            </Container>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-4 mt-4">
                <Container>
                    <Row>
                        <Col>
                            <p className="mb-0">&copy; {new Date().getFullYear()} My Blog. All Rights Reserved.</p>
                            <p>Follow us on:
                                <a href="#facebook" className="text-white mx-2">Facebook</a> |
                                <a href="#twitter" className="text-white mx-2">Twitter</a> |
                                <a href="#instagram" className="text-white mx-2">Instagram</a>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Example options - you can customize this */}
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option>Select a category</option>
                                <option value="Technology">Technology</option>
                                <option value="Sports">Sports</option>
                                <option value="Politics">Politics</option>
                                <option value="Travel">Travel</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Other">All</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formTags" className="mt-3">
                            <Form.Label>Tags (Optional)</Form.Label>
                            <Form.Control type="text" placeholder="Enter tags, separated by commas" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleExplore}>
                        Explore
                    </Button>
                </Modal.Footer>
            </Modal>

        </div >
    );
};

export default Home;
