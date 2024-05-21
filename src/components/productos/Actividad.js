// About.js
import React from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {FaUsers, FaBriefcase, FaLightbulb} from 'react-icons/fa';


const Actividad = ({nombre, descripcion}) => {
    return (
        <div >
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
        </div>
    );
}

export default Actividad;


