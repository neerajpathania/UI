// CreateBlogPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const CreateBlogPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !content || !image) {
            setError('Please fill in all fields and upload an image.');
            return;
        }

        // You can handle the form submission here (e.g., sending data to an API)
        // Example: Submit the blog data to the backend
        const blogData = {
            title,
            content,
            image,
        };

        // Reset form and show success message
        setTitle('');
        setContent('');
        setImage(null);
        setError('');
        setSuccessMessage('Blog created successfully!');
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1 className="text-center mb-4">Create a New Blog</h1>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        {/* Blog Title */}
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Blog Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter blog title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        {/* Blog Content */}
                        <Form.Group controlId="formContent" className="mb-3">
                            <Form.Label>Blog Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Write your blog content here"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>

                        {/* Blog Image */}
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Blog Image</Form.Label>
                            <Form.Control
                                type="file"
                            // onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Form.Group>

                        {/* Error Message */}
                        {error && <Alert variant="danger">{error}</Alert>}

                        {/* Success Message */}
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}

                        {/* Submit Button */}
                        <Button variant="primary" type="submit">
                            Create Blog
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateBlogPage;
