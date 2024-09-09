import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgetPassword } from "../../services/slices/auth/login";
import toast from "react-hot-toast";

const schema = yup.object().shape({
    email: yup
        .string()
        .required("Email is required")
        .email("Please Enter a valid email")
})

interface FormData {
    email: string;
}

const defaultValues = {
    email: ""
}

const ForgetPassword = () => {
    const dispatch: any = useDispatch()

    const schemas = () => {
        return yupResolver(schema)
    }

    const {
        register, handleSubmit, formState: { errors } } = useForm<FormData>({
            resolver: schemas(),
            defaultValues
        })


    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("email", data.email);

            dispatch(forgetPassword(formData))
                .unwrap()
                .then((res: any) => {
                    if (res.success) {
                        toast.success("Password Reset Link sent to your email")
                    } else {
                        toast.error("Invalid email")
                    }
                })

        } catch (error) {
            console.error("Submission Error:", error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Forget Password</h2>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                {...register("email")}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Send Reset Link
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
export default ForgetPassword;

