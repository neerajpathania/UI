// HomePage.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getPosts } from '../services/slices/components/blogs';
import { Link } from 'react-router-dom';

const Home = () => {
    const data: any = useSelector((state: any) => state.Post?.posts) || []
    const dispatch: any = useDispatch()

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleReadMore = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index)
    }

    useEffect(() => {
        dispatch(getPosts()).catch((error: any) =>
            console.error("Failed to fetch reports", error)
        )
    }, [dispatch])

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

            {/* Main Section */}
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h1 className="text-center mb-4">Latest Blogs</h1>
                    </Col>
                </Row>
                <Row>
                    {data.length > 0 ? (
                        data.map((item: any, index: any) => {
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
        </div >
    );
};

export default Home;
