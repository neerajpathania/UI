import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!email || !password) {
            setError('Please fill out all fields');
            return;
        }
        setError('');
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col md={4} className="p-4 shadow-lg rounded bg-white">
                    <h3 className="text-center mb-4">Login</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3 w-100">
                            Login
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <a href="#">Forgot Password?</a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
