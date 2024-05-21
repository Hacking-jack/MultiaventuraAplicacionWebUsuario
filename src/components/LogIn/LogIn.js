import React, { useRef } from 'react';
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { Link } from "@mui/material";
import { useAuth } from "../../contextProviders/AuthContext";

export default function Login({ showModal, handleCloseModal }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            console.log('finalizado')
            handleCloseModal(); // Cerrar modal al iniciar sesión exitosamente
        } catch {
            console.error("Failed to log in");
        }
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Usuario"
                            className="mb-3"
                        >
                            <Form.Control placeholder="Usuario"
                                          aria-label="Usuario" aria-describedby="nombre-usuario" ref={emailRef} required />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Contraseña"
                            className="mb-3"
                        >
                            <Form.Control type="password" placeholder="Contraseña"
                                          aria-label="Contraseña" aria-describedby="contrasena" ref={passwordRef} required />
                        </FloatingLabel>
                    </Form.Group>
                    <Link href="/reserva">Registrate</Link>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
