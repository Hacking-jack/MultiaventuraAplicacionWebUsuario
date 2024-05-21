// src/components/Auth/Register.js
import React, { useState, useRef } from 'react';
import { Button, FloatingLabel, Form, Container, Row, Col, Stack, InputGroup } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import './style.scss';
import {useAuth} from "../../contextProviders/AuthContext";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError('Failed to create an account');
        }
    }

    return (
        <div className="pageContainerNavFooter">
            <Row>
                <Col xs={12} md={8}>
                    <Form onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>}
                        <FloatingLabel controlId="floatingName" label="Nombre" className="mb-3">
                            <Form.Control size="sm" type="text" placeholder="Nombre" required />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingEmail" label="Correo Electrónico" className="mb-3">
                            <Form.Control size="sm" type="email" placeholder="Correo Electrónico" ref={emailRef} required />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Contraseña"
                                    ref={passwordRef}
                                    required
                                />
                                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                                    {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </Button>
                            </InputGroup>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingConfirmPassword" label="Confirmar Contraseña" className="mb-3">
                            <InputGroup>
                                <Form.Control
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirmar Contraseña"
                                    ref={confirmPasswordRef}
                                    required
                                />
                                <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </Button>
                            </InputGroup>
                        </FloatingLabel>

                        <Button variant="primary" type="submit">
                            Registrarse
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Register;
