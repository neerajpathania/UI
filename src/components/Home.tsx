// HomePage.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getPosts } from '../services/slices/components/blogs';
import { useNavigate } from 'react-router-dom';
import LoginModal from './SignUp/loginForModal';
import Footer from '../layout/footer';

const Home = () => {
    const data: any[] = useSelector((state: any) => state.Post?.posts) || []
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken")

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")

    // const handleReadMore = (index: number) => {
    //     setExpandedIndex(index === expandedIndex ? null : index)
    // }

    const handleShow = () => {
        setShow(true)
    }

    const handleHide = () => {
        setOpen(false)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleExplore = () => {
        const queryParams = new URLSearchParams({ category: selectedCategory || "All" }).toString()
        navigate(`/posts?${queryParams}`)
    }

    const handleCreateClick = () => {
        if (token) {
            navigate("/create")
        } else {
            setOpen(true)
        }
    }

    const handleReadClick = (blogId: any) => {
        navigate(`/post/${blogId}`)
    }


    useEffect(() => {
        dispatch(getPosts()).catch((error: any) =>
            console.error("Failed to fetch reports", error)
        )
    }, [dispatch])


    const latestPosts = Array.isArray(data) ? data.slice().reverse().slice(0, 3) : [];

    return (
        <div>
            {/* Navigation Bar */}
            <Navbar bg="white" variant="white" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">My Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>Home</Nav.Link>
                            <Nav.Link onClick={handleCreateClick}>Create</Nav.Link>
                            <Nav.Link onClick={handleShow}>Explore</Nav.Link>

                            {token ? (
                                <LinkContainer to='/profile'><Nav.Link className='ms-auto'>Profile</Nav.Link></LinkContainer>

                            ) : (
                                <LinkContainer to='/login'><Nav.Link>Login</Nav.Link></LinkContainer>
                            )} :
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <div className="hero">
                {/* <h1>Inspiring Creativity and Innovation</h1> */}
            </div>

            {/* Recent Posts */}

            <Container className="mt-4 slidePosts">
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
                                <Col key={item.id} md={4} className="mb-4">
                                    <Card>
                                        <Card.Img variant="top" src={item?.image} alt="Blog Image" />
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text className={isExpanded ? 'expanded' : 'collapsed'}>
                                                {item.content}
                                            </Card.Text>
                                            <Button variant="success" className="ReadButton" onClick={() => handleReadClick(item._id)}>
                                                Read More
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
            <Footer />

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

            <Modal show={open} onHide={handleHide} className='shadow'>
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0 ">
                        <h1 className=" mb-0 fs-2 ">Login Now</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleHide}></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <LoginModal />
                    </div>
                </div>
            </Modal>

        </div >
    );
};

export default Home;
