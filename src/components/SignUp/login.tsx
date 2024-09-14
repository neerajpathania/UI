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

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid work email address")
        .required("Email is required"),
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
        try {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);

            dispatch(userLogin(formData))
                .unwrap()
                .then((res: any) => {
                    if (res.success) {
                        toast.success("Login successful")
                        navigate('/home');
                    } else if (res.error) {
                        toast.error("Incorrect Email or password")
                    }
                })

        } catch (error) {
            toast.error("Login Failed");
            console.error("Submission Error:", error);
        }
    }

    const handleForgetButton = () => {
        navigate("/forgetPassword")
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
                        <Button variant="primary" type="submit" className="mt-3 w-100">
                            Login
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <a onClick={handleForgetButton}>Forgot Password?</a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
