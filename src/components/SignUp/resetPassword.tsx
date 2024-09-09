import React from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { resetPassword } from "../../services/slices/auth/login";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object().shape({
    newPassword: yup
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
    newPassword: string;
}

const defaultValues = {
    newPassword: ""
}

const ResetPassword = () => {
    const { token } = useParams();
    const dispatch: any = useDispatch()
    const navigate = useNavigate()

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
            dispatch(resetPassword({ newPassword: data.newPassword, token }))
                .unwrap()
                .then((res: any) => {
                    if (res.success) {
                        toast.success("Password reset Successfull")
                        navigate('/login');
                    }
                })


        } catch (error) {
            console.error("Submission Error:", error);
        }
    }


    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Reset Password</h2>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                {...register("newPassword")}
                                required
                            />
                        </Form.Group>
                        {/* <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                required
                            />
                        </Form.Group> */}
                        <Button variant="primary" type="submit" className="mt-3">
                            Reset Password
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPassword;
