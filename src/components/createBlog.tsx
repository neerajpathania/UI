// CreateBlogPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { createPosts } from '../services/slices/components/blogs';
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
    const userId = localStorage.getItem("userId")

    const {
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
    });

    const onSubmit = async (e: any, data: any) => {

        const blogData = {
            title: title,
            content: content,
            image: image,
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
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </Form.Group>

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
