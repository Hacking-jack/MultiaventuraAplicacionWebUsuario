import { Calendar } from "react-calendar";
import React, { useState } from "react";
import { useAuth } from "../../contextProviders/AuthContext";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';
import './style.scss';
import { Col, Container, Row } from "react-bootstrap";

export const CalendarDatetimePicker = ({ reservas, actividad, horaInicio, horaFin, intervaloHora }) => {
    const { currentUser } = useAuth();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);

    const handleDateClick = date => {
        setSelectedDate(date);
    };

    const combineDateAndTime = (date, time) => {
        if (!date || !time) return null;
        const [hours, minutes] = time.split(':');
        const combinedDate = new Date(date);
        combinedDate.setHours(hours, minutes);
        return combinedDate;
    };

    const handleSubmit = () => {
        const combinedDateTime = combineDateAndTime(selectedDate, selectedHour);
        console.log("Selected DateTime: ", combinedDateTime);
        // Aquí puedes agregar la lógica para manejar la reserva
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month' && reservas && actividad !== null) {
            let dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            let compara = Date.parse(dateString);

            for (const reservaId in reservas) {
                if (reservas.hasOwnProperty(reservaId)) {
                    const dato = reservas[reservaId];
                    if (Date.parse(dato.fecha) === compara && actividad.id === dato.actividad) {
                        if (currentUser.uid === dato.user) {
                            return 'myReserve';
                        } else {
                        }
                    }
                }
            }
        }
        return null;
    };

    const disableTiles = ({ date }) => {
        let dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        let compara = Date.parse(dateString);
        console.log({compara})
        let respuesta = false;

        if (date.getDay() === 0) {
            respuesta = true;
        }

        for (const reservaId in reservas) {
            if (reservas.hasOwnProperty(reservaId)) {
                const dato = reservas[reservaId];
                if (Date.parse(dato.fecha) === compara && actividad.id === dato.actividad) {

                    respuesta = true;
                }
            }
        }
        console.log(respuesta)
        return respuesta;
    };

    return (
        <Container style={{ marginTop: '3vh', marginBottom: '3vh' }}>
            <Row>
                <Col>
                    <Calendar
                        className="custom-calendar"
                        initialDate={Date.now()}
                        tileDisabled={disableTiles}
                        value={selectedDate}
                        tileClassName={tileClassName}
                        onClickDay={handleDateClick}
                        required
                    />
                </Col>
                <Col>
                    <HourPicker
                        startHour={horaInicio}
                        endHour={horaFin}
                        numHours={intervaloHora}
                        selectedHour={selectedHour}
                        setSelectedHour={setSelectedHour}
                    />
                </Col>
            </Row>

        </Container>
    );
}

const HourPicker = ({ startHour = 0, endHour = 12, numHours = 12, selectedHour, setSelectedHour }) => {
    const generateHours = (startHour, endHour, numHours) => {
        const hours = [];
        const start = parseInt(startHour, 10);
        const end = endHour ? parseInt(endHour, 10) : start + numHours;

        for (let i = start; i < end; i++) {
            hours.push(i.toString().padStart(2, '0') + ':00');
        }
        return hours;
    };

    const hours = generateHours(startHour, endHour, numHours);

    return (
        <Container fluid className="d-flex flex-column" style={{ height: '100%' }}>
            <Row className='flex-grow-1'>
                {hours.map((hour, index) => (
                    <Col
                        key={index}
                        xs={6}
                        className="p-2 align-items-stretch"
                        style={{
                            border: '1px solid #ddd',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: selectedHour === hour ? '#d3d3d3' : 'white',
                        }}
                        onClick={() => setSelectedHour(hour)}
                    >
                        {hour}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
