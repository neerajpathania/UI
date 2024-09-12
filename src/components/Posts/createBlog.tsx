// CreateBlogPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { createPosts } from '../../services/slices/components/blogs';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';


const CreateBlogPage = () => {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const [error, setError] = useState({
        title: '',
        content: '',
        category: ''
    })

    const validateForm = () => {
        const newError = { title: '', content: '', category: '' };
        let isValid = true;

        if (!title.trim()) {
            newError.title = 'Title is required';
            isValid = false;
        }
        if (!content.trim()) {
            newError.title = 'Content is required';
            isValid = false;
        }
        if (!category.trim()) {
            newError.category = 'Category is required';
            isValid = false;
        }
        setError(newError);
        return isValid;
    }
    const userId = localStorage.getItem("userId")

    const {
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
    });

    const onSubmit = async (e: any, data: any) => {
        if (validateForm()) {
            const blogData = {
                title: title,
                content: content,
                image: image,
                category: category,
                userId: userId
            }

            try {
                await dispatch(createPosts(blogData)).
                    unwrap().
                    then((res: any) => {
                        if (res.success) {
                            toast.success("Post Created Succesfully");
                            navigate('/home')
                        } else {
                            toast.error("Failed to create Post")
                        }
                    })
            } catch (error) {
                console.error(error)
            }
        }

    };

    const handleImageChange = (e: any) => {
        setImage(e.target.files[0]);
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
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {/* Blog Title */}
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Blog Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter blog title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {error.title && (
                                <Alert variant="danger" className="mt-2">
                                    {error.title}
                                </Alert>
                            )}
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
                            {error.content && (
                                <Alert variant="danger" className="mt-2">
                                    {error.content}
                                </Alert>
                            )}
                        </Form.Group>

                        {/* Blog Image */}
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Blog Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </Form.Group>

                        {/* {Select Category} */}
                        <Form.Label>Select Your Category</Form.Label>
                        <Form.Select aria-label="Default select example" className="mb-3" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>Open this select menu</option>
                            <option value="Technology">Technology</option>
                            <option value="Sports">Sports</option>
                            <option value="Politics">Politics</option>
                            <option value="Travel">Travel</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="All">Other</option>
                            {error.category && (
                                <Alert variant="danger" className="mt-2">
                                    {error.category}
                                </Alert>
                            )}
                        </Form.Select>

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
