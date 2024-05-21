import './App.scss';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Inicio from './components/inicio/Inicio';
import About from "./components/about/About";
import Register from './components/registrarse/Register';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, {useEffect, useState} from 'react';
import {Button, Row} from "react-bootstrap";
import Login from "./components/LogIn/LogIn";
import Reserve from "./components/reserva/Reserve";
import {useAuth} from "./contextProviders/AuthContext";
import {Link} from "@mui/material";
import Precios from "./components/productos/Precios";

function App() {
    const {currentUser, logout} = useAuth();
    const [isCollapsed] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [loggedIn, setLoggedIn] = useState(!!currentUser);

    console.log(loggedIn)

    useEffect(() => {
        // Observar los cambios en currentUser y actualizar loggedIn
        setLoggedIn(!!currentUser); // !! convierte currentUser a un valor booleano
    }, [currentUser]);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);


    const handleLogin = async () => {
        console.log('Login clicked');
        handleCloseModal();
        setLoggedIn(true);
    };

    const handleSignOut = async () => {
        console.log('LogOut clicked');
        await logout()
        setLoggedIn(false);
    };

    return (
        <Router>
            <Navbar bg="primary" data-bs-theme="dark" variant="dark" expand="lg">
                <Container fluid className={isCollapsed ? "justify-content-center" : ""}>
                    <Navbar.Brand href="/">Cabuerniaventura</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav"/>
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="/about">Quienes somos</Nav.Link>
                            <Nav.Link href="/precios">Precios</Nav.Link>
                            {loggedIn ? (<Nav.Link href="/reserva">Reserva</Nav.Link>) : (
                                <Nav.Link href="/registrate">Registrate</Nav.Link>)}
                        </Nav>
                        <Nav className="ml-auto">
                            {!loggedIn ? (
                                <Button variant="outline-light" onClick={handleShowModal}>LogIn</Button>
                            ) : (
                                <Button variant="outline-light" onClick={handleSignOut}>SignOut</Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Login showModal={showModal} handleCloseModal={handleCloseModal} handleLogin={handleLogin}></Login>
            </Navbar>
            <Container className='root-container'>

                <Routes>
                    <Route path="/" element={<Inicio/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/precios" element={<Precios/>}/>
                    <Route path="/registrate" element={<Register/>}/>
                    {loggedIn && (
                        <Route path="/reserva" element={<Reserve/>}/>
                    )}
                </Routes>

                <Row>
                    <footer className='footer bottom'>
                        <div className='footer-content'>
                            <p>© 2024 Cabueniaventura. Todos los derechos reservados.</p>
                            <p>Contacto: info@cabueniaventura.com</p>
                        </div>
                    </footer>
                </Row>
            </Container>
        </Router>
    )
        ;
}

export default App;
