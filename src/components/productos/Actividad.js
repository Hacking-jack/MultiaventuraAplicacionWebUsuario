// About.js
import React from 'react';
import './style.scss'


const Actividad = ({nombre, descripcion, precioPersona, maximoIntegrantes, duracion}) => {
    return (
        <div className='tarjeta'>
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
            <p>Precio por persona:{precioPersona}</p>
            <p>Numero de integrantes:{maximoIntegrantes}</p>
            <p>Duracion estimada:{duracion}</p>

        </div>
    );
}

export default Actividad;


