import React from 'react';
import {Col, Row, Container, Carousel, Image} from "react-bootstrap";
import './style.scss'
import zIndex from "@mui/material/styles/zIndex";

const Inicio = () => {
    return (
        <div>
            <Row>
                <Col xs={12} className='elemento'>
                    <Carousel fade>
                        <Carousel.Item className='parallax-layer'>
                            <Image
                                src="https://img.freepik.com/foto-gratis/dos-excursionistas-tirolina-aventura-contra-cielo-costa-rica_23-2148248816.jpg?t=st=1714925582~exp=1714929182~hmac=b5b8a4f094a429594f9dbfd38ef503207ba9719bdfd83b1c1aa0d7b50e1844d1&w=1380"
                                fluid
                                style={{height: "94vh", width: "100vw"}}
                            />
                            <Carousel.Caption className='caption'>
                                <h1 className="title">¡Bienvenidos a Cabuerniaventura!</h1>
                                <p>Somos un parque de aventuras ubicado en lo más profundo de la cordillera cantábrica.
                                    Ofrecemos
                                    una experiencia única llena de diversión y emoción para todas las edades.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                src="https://img.freepik.com/foto-gratis/vista-general-areos-cosgaya-municipio-camaleo-cantabria-espana_463209-106.jpg?t=st=1714302838~exp=1714306438~hmac=c90b8a5fd3eae8ba0b8fcd87baa3eaee79ffcafeccca11474392c5b395524945&w=1380"
                                fluid
                                style={{height: "94vh", width: "100vw"}}
                            />
                            <Carousel.Caption className='caption'>
                                <h2 className="subtitle">Explora la naturaleza</h2>
                                <p>Descubre la belleza natural de nuestro entorno mientras te aventuras en emocionantes
                                    actividades
                                    al aire libre. Desde senderismo hasta escalada, tenemos algo para todos los amantes
                                    de la
                                    naturaleza.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                src="https://img.freepik.com/foto-gratis/ninos-valientes-divirtiendose-parque-aventuras_23-2149033159.jpg?t=st=1714302904~exp=1714306504~hmac=fa3aab90d3ad348b70d3f2feef4b20d37b87d32ccac6dbe78eeaa6100742c8df&w=1380"
                                fluid
                                style={{height: "94vh", width: "100vw"}}
                            />
                            <Carousel.Caption className='caption'>
                                <h2 className="subtitle">Emoción sin límites</h2>
                                <p>Experimenta la adrenalina de nuestras atracciones emocionantes. Desde tirolinas
                                    de vértigo hasta
                                    puentes colgantes, te garantizamos una dosis de emoción que nunca
                                    olvidarás.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <div className='pageContainerFooter' style={{paddingTop: '10vh'}}>
                    <h1>Descubre Cabueniaventura</h1>
                    <p>¡Bienvenidos a Cabueniaventura!</p>
                    <p>En Cantabria, te esperamos en nuestro Parque de Ocio y Multiaventura con Alojamientos y nuestra
                        acogedora Cabaña para familias.</p>
                    <p>¡TIROLINAS, PUENTES, KARTS A PEDALES, TIRO CON ARCO y MUCHO MÁS!</p>
                    <p>Ven a conocernos con tus amigos o en familia, puedes pasar el día entero con nosotros e incluso
                        quedarte a dormir. Puedes traer la comida, salir a comer a los excelentes restaurantes de la
                        zona, hacerte una barbacoa o comer en nuestro bar.</p>
                    <p>PARA TODA LA FAMILIA Y TODAS LAS EDADES</p>
                    <p>Todas las actividades están incluidas en el precio de la entrada menos las de paintball, también
                        para todas las edades.</p>
                    <p>Abrimos todo el año y tenemos los mejores precios y tarifas para ti y tu familia. También tenemos
                        entrada de niños solos.</p>

                </div>
            </Row>
        </div>
    );
}
export default Inicio;