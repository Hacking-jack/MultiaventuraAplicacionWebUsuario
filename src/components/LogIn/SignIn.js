import React, { useRef } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { useAuth } from '../../contextProviders/AuthContext';
function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    async function handleSubmit(e) {

        e.preventDefault();
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            console.error("Failed to create an account", error);
        }
    }

    return (
        <Row>
            <Form onSubmit={handleSubmit}>
                <Container>
                    <Form.Group className="mb-3">
                        <Row>
                            <Stack gap={3}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        aria-label="Email"
                                        aria-describedby="email"
                                        ref={emailRef}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Password"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="password"
                                        ref={passwordRef}
                                        required
                                    />
                                </FloatingLabel>
                            </Stack>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="outline-info" type="submit" className="justify-content-end">Sign Up</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Container>
            </Form>
        </Row>
    );
}

export default SignIn;
