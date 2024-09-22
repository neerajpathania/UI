import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { profileData } from '../../services/slices/auth/login';
import { deletePost, editPost } from '../../services/slices/components/blogs';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BlogReachChart from '../charts/growthChart';

const ProfilePage = () => {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [posts, setPosts] = useState<any>([])
    const [blogId, setBlogId] = useState("")
    const [show, setShow] = useState(false)
    const [editTitle, setEditTitle] = useState("")
    const [editContent, setEditContent] = useState("")
    const [editCategory, setEditCategory] = useState("")


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
                dispatch(profileData({ userId }))
                    .unwrap()
                toast.success('Post deleted successfully');
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

    const handlelogout = () => {
        localStorage.removeItem("authToken")
        navigate("/login")
    }

    const handleOpen = (post: any) => {
        setEditTitle(post?.title)
        setEditContent(post?.content)
        setEditCategory(post?.category)
        setBlogId(post._id);
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    const {
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
    });

    const onsubmit = async () => {
        const blogData = {
            blogId,
            userId,
            title: editTitle,
            content: editContent,
            category: editCategory
        }

        try {
            await dispatch(editPost(blogData)).
                unwrap().
                then((res: any) => {
                    if (res.success) {
                        toast.success("Post Updated Succesfully");
                        navigate('/home')
                    } else {
                        toast.error("Failed to create Post")
                    }
                })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">My Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to='/'><Nav.Link>Home</Nav.Link></LinkContainer>
                            <LinkContainer to='/create'><Nav.Link>Create</Nav.Link></LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Profile Section */}
            <Container className="mt-5">
                <Row className={"head"}>
                    <Col md={4} className='mt-5'>
                        <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                            {/* <Card.Img variant="top" src={user.profileImage} /> */}
                            <Card.Body className="text-center">
                                <Card.Title>{name}</Card.Title>
                                <Card.Text>{email}</Card.Text>
                                <LinkContainer to="/settings">
                                    <Button variant="outline-primary">Settings</Button>
                                </LinkContainer>
                                <Button variant="outline-success" className='ms-3' onClick={handlelogout}>Logout</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <BlogReachChart />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h3 className="mb-4 text-center typewriter">My Posts</h3>
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
                                                    <Button variant="success" className='ms-3 px-4' onClick={() => handleOpen(post)}>Edit</Button>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onsubmit)}>
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Blog Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter blog title"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            {/* {error.title && (
                                <Alert variant="danger" className="mt-2">
                                    {error.title}
                                </Alert>
                            )} */}
                        </Form.Group>

                        {/* Blog Content */}
                        <Form.Group controlId="formContent" className="mb-3">
                            <Form.Label>Blog Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Write your blog content here"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            {/* {error.content && (
                                <Alert variant="danger" className="mt-2">
                                    {error.content}
                                </Alert>
                            )} */}
                        </Form.Group>

                        {/* Blog Image */}
                        <Form.Group controlId="formFile" className="mb-3" >
                            <Form.Label>Upload Blog Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                            />
                        </Form.Group>

                        {/* {Select Category} */}
                        <Form.Label>Select Your Category</Form.Label>
                        <Form.Select aria-label="Default select example" className="mb-3" value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                            <option>Open this select menu</option>
                            <option value="Technology">Technology</option>
                            <option value="Sports">Sports</option>
                            <option value="Politics">Politics</option>
                            <option value="Travel">Travel</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="All">Other</option>
                            {/* {error.category && (
                                <Alert variant="danger" className="mt-2">
                                    {error.category}
                                </Alert>
                            )} */}
                        </Form.Select>


                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Discard
                            </Button>
                            <Button variant="primary" type='submit'>
                                Save
                            </Button>
                        </Modal.Footer>

                    </Form>
                </Modal.Body>
            </Modal>
        </div >
    );
};

export default ProfilePage;
