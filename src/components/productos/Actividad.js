// About.js
import React from 'react';
import './style.scss'


const Actividad = ({nombre, descripcion, precioPersona, maximoIntegrantes, duracion}) => {
    return (
        <div className='tarjeta'>
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
            <p>{precioPersona}</p>
            <p>{maximoIntegrantes}</p>
            <p>{duracion}</p>
        </div>
    );
}

export default Actividad;


