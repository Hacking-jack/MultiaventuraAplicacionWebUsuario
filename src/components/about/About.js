// About.js
import React from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {FaUsers, FaBriefcase, FaLightbulb} from 'react-icons/fa';
import '../../App.scss'

const About = () => {
    return (
        <Row className='pageRow' style={{height: '100%', minHeight: '85.4vh'}}>
            <Container fluid style={{color:'white'}}>
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <h1>Sobre Nosotros</h1>
                        <p>En Cabuerniaventura, somos un equipo de jóvenes monitores apasionados por la naturaleza y la
                            aventura. Nos dedicamos a ofrecer experiencias inolvidables y a promover el turismo
                            sostenible en Cantabria.</p>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={4} className="text-center">
                        <div className="about-item">
                            <FaUsers className="about-icon"/>
                            <h3>Nuestro Equipo</h3>
                            <p>Nuestro equipo está compuesto por jóvenes entusiastas y expertos en actividades al aire
                                libre, comprometidos con brindar experiencias seguras y emocionantes para todos nuestros
                                visitantes.</p>
                        </div>
                    </Col>
                    <Col md={4} className="text-center">
                        <div className="about-item">
                            <FaBriefcase className="about-icon"/>
                            <h3>Nuestra Misión</h3>
                            <p>Nuestra misión es reconectar a las personas con la naturaleza y revitalizar las regiones
                                en vías de despoblación, ofreciendo aventuras que fomenten el respeto y el amor por el
                                entorno natural.</p>
                        </div>
                    </Col>
                    <Col md={4} className="text-center">
                        <div className="about-item">
                            <FaLightbulb className="about-icon"/>
                            <h3>Nuestra Visión</h3>
                            <p>Queremos ser un referente en turismo de aventura, inspirando a nuestros visitantes a
                                descubrir la belleza de Cantabria y a participar activamente en la conservación de
                                nuestro medio ambiente.</p>
                        </div>
                    </Col>
                </Row>

            </Container>
        </Row>

    )
        ;
}

export default About;
