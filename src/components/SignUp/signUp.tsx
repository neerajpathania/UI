import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSignUp } from "../../services/slices/auth/signup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid work email address")
        .required("Email is required"),
    name: yup.string().required("First name is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    password: yup
        .string()
        .required("Password is required")
        .matches(/^[^\s]*$/, "Password must not contain spaces")
        .matches(
            /^(?=.*[A-Z])/,
            "Password must contain at least one uppercase letter"
        )
        .matches(/^(?=.*[0-9])/, "Password must contain at least one number")
        .min(8, "Password must be atleast 8 characters long"),
});

interface FormData {
    email: string;
    name: string;
    phoneNumber: string;
    password: string;
}

const defaultValues = {
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
}

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch: any = useDispatch()

    const [formData, setFormData] = useState<any>(defaultValues);

    const schemas = () => {
        return yupResolver(schema)
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log("Form data submitted:", data); // Check if this logs
        try {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("name", data.name);
            formData.append("phoneNumber", data.phoneNumber);
            formData.append("password", data.password);

            // Dispatch action to sign up user
            await dispatch(userSignUp(formData)).unwrap().then((res: any) => {
                if (res.success) {
                    toast.success("Signup Successful");
                    navigate("/login");
                }
            })

        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Signup Failed");
        }
    };


    return (
        <>
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Row className="w-100">
                    <Col md={6} lg={4}>
                        <div className="border p-4 rounded bg-light shadow-sm">
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" {...register('name')} required />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {errors?.name?.message}
                                        </p>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mt-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" {...register('email')} required />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {errors?.email?.message}
                                        </p>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="formPassword" className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" {...register('password')} required />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {errors?.password?.message}
                                        </p>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="formPhoneNumber" className="mt-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="tel" placeholder="Enter your phone number" {...register('phoneNumber')} required />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mt-4">
                                    Sign Up
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SignUp