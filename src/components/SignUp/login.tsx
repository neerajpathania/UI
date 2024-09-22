import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from "yup";
import { userLogin } from '../../services/slices/auth/login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleLogin from "./googleLogin";


const schema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid work email address")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
})

interface FormData {
    email: string;
    password: string;
}

const defaultValues = {
    email: "",
    password: "",
}


const LoginPage = () => {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const [password, setPassword] = useState(false);

    const schemas = () => {
        return yupResolver(schema)
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: schemas(),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log("clicked")
        try {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);

            dispatch(userLogin(formData))
                .unwrap()
                .then((res: any) => {
                    if (!res.success) {
                        toast.error(res.message || "Incorrect Email or password")
                    } else {
                        toast.success("Login successful")
                        navigate('/');
                    }

                })

        } catch (err) {
            console.log(err, "errrrrrrrrrrr")
            toast.error('An error occurred. Please try again.');
        }
    }

    const handleForgetButton = () => {
        navigate("/forgetPassword")
    }
    const handleSignup = () => {
        navigate("/signup")
    }


    return (
        <Container className="login-container">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col md={4} className="p-4 shadow-lg rounded bg-white">
                    <h3 className="text-center mb-4">Login</h3>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-2">{errors?.email?.message}</p>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3 position-relative">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type={password ? "text" : "password"}
                                placeholder="Password"
                                {...register('password')}
                            />
                            <span
                                className=" position-absolute end-0 translate-middle-y me-2 adjust"
                                onClick={() => setPassword(!password)}
                            >
                                {password ? (
                                    <VisibilityIcon />
                                ) : (
                                    <VisibilityOffIcon />
                                )}
                            </span>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-2">{errors?.password?.message}</p>
                            )}
                        </Form.Group>
                        <Button variant="success" type="submit" className="mt-3 w-100">
                            Login
                        </Button>
                    </Form>
                    <div className='mb-1 text-end'>
                        <a onClick={handleForgetButton}>Forgot Password?</a>
                    </div>
                    <p className="fs-6 mb-3 text-center mt-3">Or</p>
                    <GoogleLogin />
                    <h6 className='text-center' onClick={handleSignup}>Don't Have an account? Signup</h6>

                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
