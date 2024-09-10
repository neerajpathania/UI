import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { profileData } from '../../../services/slices/auth/login';
import { deletePost } from '../../../services/slices/components/blogs';

const ProfilePage = () => {
    const dispatch: any = useDispatch()
    const userData = useSelector((state: any) => state.data?.data) || []
    const userId = localStorage.getItem("userId")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [posts, setPosts] = useState<any>([])
    const [blogId, setBlogId] = useState("")


    useEffect(() => {
        dispatch(profileData({ userId }))
            .unwrap()
            .then((res: any) => {
                setName(res?.name)
                setEmail(res?.email)
                setPosts(res?.posts)
            })
            .catch((error: any) => console.error("Failed to fetch profile data:", error));
    }, [dispatch, userId])

    const handleDelete = (blogId: string) => {
        const userId = localStorage.getItem("userId")
        dispatch(deletePost({ blogId, userId }))
            .unwrap()
            .then(() => {
                console.log('Post deleted successfully');
                // Optionally, you can refresh the posts after deletion
                // dispatch(profileData({ userId }));
            })
            .catch((error) => {
                console.error('Failed to delete post:', error);
            });
    }


    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleReadMore = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">My Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>Profile</Nav.Link>
                            <LinkContainer to="/settings"><Nav.Link>Settings</Nav.Link></LinkContainer>
                            <Nav.Link>Home</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Profile Section */}
            <Container className="mt-5">
                <Row>
                    <Col md={4}>
                        <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                            {/* <Card.Img variant="top" src={user.profileImage} /> */}
                            <Card.Body className="text-center">
                                <Card.Title>{name}</Card.Title>
                                <Card.Text>{email}</Card.Text>
                                <LinkContainer to="/settings">
                                    <Button variant="outline-primary">Settings</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <h3 className="mb-4 text-center">My Posts</h3>
                        <Row>
                            {posts.length > 0 ? (
                                posts.map((post: any, index: any) => {
                                    const isExpanded = expandedIndex === index;
                                    return (
                                        <Col key={post._id} md={6} className="mb-4">
                                            <Card className="shadow-sm">
                                                <Card.Img variant="top" src={post.image} alt="Blog Image" />
                                                <Card.Body>
                                                    <Card.Title>{post.title}</Card.Title>
                                                    <Card.Text className={isExpanded ? 'expanded' : 'collapsed'}>
                                                        {isExpanded ? post.content : `${post.content.slice(0, 100)}...`}
                                                    </Card.Text>
                                                    <Button variant="primary" onClick={() => handleReadMore(index)}>
                                                        {isExpanded ? 'Read Less' : 'Read More'}
                                                    </Button>
                                                    <Button variant="success" className='ms-3 px-4'>Edit</Button>
                                                    <Button variant="danger" className='ms-3' onClick={() => handleDelete(post._id)}>Delete</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })
                            ) : (
                                <p className="text-center">No posts available.</p>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
