// CreateBlogPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { createPosts } from '../../services/slices/components/blogs';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HomeIcon from '@mui/icons-material/Home';



const CreateBlogPage = () => {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [category, setCategory] = useState("");
    const [publishTime, setPublishTime] = useState<any>(null)
    const [publishOption, setPublishOption] = useState("No")
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
        const formattedPublishTime = publishOption === "Yes" && publishTime ? publishTime.toISOString() : null;
        if (validateForm()) {
            const blogData = {
                title: title,
                content: content,
                image: image,
                category: category,
                publishTime: formattedPublishTime,
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

    const handleClick = () => {
        navigate("/")
    }

    return (
        <section className='blogSection'>
            <Container>
                <Row>
                    <Col md={2} className="mt-2">
                        <button
                            className=" border-lightgray3 text-gray-dark border rounded-4 px-3 py-2 blogSection"
                            onClick={handleClick}
                        >
                            <span className="rotate-180 inline-block text-gray-dark mob-font">
                                <HomeIcon />
                            </span>{" "}
                            Back to Home
                        </button>
                    </Col>
                    <Col>
                        {/* <h1 className="text-center mb-4">Think & Write</h1> */}
                    </Col>
                </Row>

                <Row className="justify-content-center create">
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
                                    className='oneLineInput'
                                />
                                {error.title && (
                                    <p className="mt-2 text-danger">
                                        {error.title}
                                    </p>
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
                                    className='oneLineInput'
                                />
                                {error.content && (
                                    <p className="mt-2 text-danger">
                                        {error.content}
                                    </p>
                                )}
                            </Form.Group>

                            {/* Blog Image */}
                            <Form.Group controlId="formFile" className="mb-3    " >
                                <Form.Label>Upload Blog Image</Form.Label>
                                <div className="custom-file-wrapper">
                                    <label className="custom-file-label" htmlFor="customFileInput">
                                        {image ? image.name : "Choose file"}
                                    </label>
                                    <Form.Control
                                        type="file"
                                        id="customFileInput"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="d-none"
                                    />
                                </div>
                            </Form.Group>

                            {/* {Select Category} */}
                            <Form.Label>Select Your Category</Form.Label>
                            <Form.Select aria-label="Default select example" className="mb-3 oneLineInput" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option className='oneLineInput'>Open this select menu</option>
                                <option value="Technology">Technology</option>
                                <option value="Sports">Sports</option>
                                <option value="Politics">Politics</option>
                                <option value="Travel">Travel</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="All">Other</option>
                                {error.category && (
                                    <p className="mt-2 text-danger">
                                        {error.category}
                                    </p>
                                )}
                            </Form.Select>

                            <Form.Group controlId="formPublishTime" className="mb-3">
                                <Form.Label>Schedule This Post (optional)</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="publishOption"
                                    value="Yes"
                                    checked={publishOption === "Yes"}
                                    onChange={(e) => setPublishOption(e.target.value)}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="publishOption"
                                    value="No"
                                    checked={publishOption === "No"}
                                    onChange={(e) => setPublishOption(e.target.value)}
                                />
                                {publishOption === "Yes" && (
                                    <DatePicker
                                        selected={publishTime}
                                        onChange={(date) => setPublishTime(date)}
                                        showTimeSelect
                                        dateFormat="Pp"
                                        className="form-control oneLineInput"
                                    />
                                )}

                            </Form.Group>

                            {/* Submit Button */}
                            <button className="border-lightgray3 text-gray-dark border rounded-4 px-3 py-2 blogSection" type="submit">
                                Create Blog
                            </button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section >
    );
};

export default CreateBlogPage;
