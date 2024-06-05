// About.js
import React from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {FaUsers, FaBriefcase, FaLightbulb} from 'react-icons/fa';
import '../../App.scss'
const About = () => {
    return (
        <Row style={{height:'100%',minHeight:'85.4vh'}}>
            <Container fluid >
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <h1>Sobre Nosotros</h1>
                        <p>Somos una empresa dedicada a la innovación y al servicio excepcional.</p>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={4} className="text-center">
                        <div className="about-item">
                            <FaUsers className="about-icon"/>
                            <h3>Nuestro Equipo</h3>
                            <p>Nuestro equipo está formado por profesionales apasionados y dedicados a brindar
                                soluciones de calidad.</p>
                        </div>
                    </Col>
                    <Col md={4} className="text-center">
                        <div className="about-item">
                            <FaBriefcase className="about-icon"/>
                            <h3>Nuestra Misión</h3>
                            <p>Nuestra misión es ofrecer productos y servicios innovadores que agreguen valor a
                                nuestros
                                clientes.</p>
                        </div>
                    </Col>
                    <Col md={4} className="text-center">
                        <div className="about-item">
                            <FaLightbulb className="about-icon"/>
                            <h3>Nuestra Visión</h3>
                            <p>Buscamos ser líderes en nuestro sector, impulsando constantemente la creatividad
                                y la
                                excelencia.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Row>

    )
        ;
}

export default About;
