// About.js
import React, {useState} from 'react';
import './style.scss'
import {Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../../contextProviders/AuthContext";

const Actividad = ({nombre, descripcion, precioPersona, maximoIntegrantes, duracion, index}) => {
    const navigate = useNavigate();
    const {currentUser}= useAuth()
    const [loggedIn] = useState(!!currentUser);

    const handleReservarClick = () => {
        loggedIn ? navigate('/reserva', {state: {index}}) : navigate('/') ;
    };

    return (
        <div className='tarjeta'>
            <h3>{nombre}</h3>
            <p className='descripcion'>{descripcion}</p>
            <p className='precio'>Precio por persona: {precioPersona}</p>
            <p className='integrantes'>Número de integrantes: {maximoIntegrantes}</p>
            <p className='duracion'>Duración estimada: {duracion}</p>
            {loggedIn ? <Button onClick={handleReservarClick}>Reservar</Button> :<></> }
            </div>
    );
}

export default Actividad;


