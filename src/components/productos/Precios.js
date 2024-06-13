import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {FaUsers, FaBriefcase, FaLightbulb} from 'react-icons/fa';
import Slider from 'react-slick';
import Actividad from './Actividad';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss'


function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", }}
            onClick={onClick}
        />

    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", }}
            onClick={onClick}
        />
    );
}

const Precios = ({actividades}) => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "25vw",
        dots: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
            <Row className='pageRow'>
                <Slider {...settings} className="slider" >
                    {actividades.map((actividad, index) => (
                        <div key={index}>
                            <Actividad nombre={actividad.nombre} descripcion={actividad.descripcion}
                                       duracion={actividad.duracion} maximoIntegrantes={actividad.maximoIntegrantes}
                                       precioPersona={actividad.precioPersona} index={index}
                            />
                        </div>
                    ))}
                </Slider>
            </Row>

    );
}

export default Precios;
