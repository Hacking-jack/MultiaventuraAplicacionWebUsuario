import {Calendar} from "react-calendar";
import React, {useState, useEffect} from "react";
import {useAuth} from "../../contextProviders/AuthContext";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';
import './style.scss';
import {Button, Col, Container, Row} from "react-bootstrap";

export const CalendarDatetimePicker = ({reservas, actividad, startHour, endHour, setSelectedDateHour}) => {
    const {currentUser} = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hours, setHours] = useState([]);

    useEffect(() => {
        setHours(generateHours());
        setLoading(false);
    }, []);

    useEffect(() => {
        if (selectedDate != null) {
            setHours(classifyHours);
        }
    }, [selectedDate]);

    useEffect(() => {
        if (selectedDate && selectedHour) {
            const combinedDate = new Date(selectedDate);
            const [hour, minute] = selectedHour.split(':').map(Number);
            combinedDate.setHours(hour);
            combinedDate.setMinutes(minute);
            setSelectedDateHour(combinedDate);
        }
    }, [selectedDate, selectedHour, setSelectedDateHour]);

    const generateHours = () => {
        const hours = [];
        const startHourStr = startHour.replace(':', '').padStart(4, '0');
        const startHourMinutes = parseInt(startHourStr.slice(-2), 10);
        const startHourHour = parseInt(startHourStr.slice(0, -2), 10);

        const endHourStr = endHour.replace(':', '').padStart(4, '0');
        const endHourMinutes = parseInt(endHourStr.slice(-2), 10);
        const endHourHour = parseInt(endHourStr.slice(0, -2), 10);

        let currentHour = startHourHour;
        let currentMinute = startHourMinutes;

        while (currentHour <= endHourHour || (currentHour === endHourHour && currentMinute <= endHourMinutes)) {
            const hourStr = currentHour.toString().padStart(2, '0');
            const minuteStr = currentMinute.toString().padStart(2, '0');
            hours.push([`${hourStr}:${minuteStr}`, false]);
            currentHour++;
        }
        return hours;
    };

    const handleDateClick = (date) => {
        try {
            if (date.getTime() !== selectedDate.getTime()) {
                const fe = new Date(date);
                setSelectedDate(fe);
            }
        } catch (error) {
            console.error("Error setting selected date:", error);
        }
    };

    function classifyHours() {
        let copia = generateHours();
        let [horaDur, minutoDur] = actividad.duracion.split(':').map(Number);

        if (minutoDur !== 0 && minutoDur != null) {
            horaDur += 1;
        }

        for (const reservaId in reservas) {
            if (reservas.hasOwnProperty(reservaId)) {
                let fecha = new Date(reservas[reservaId].fecha);
                if (selectedDate.getDate() === fecha.getDate() && selectedDate.getMonth() === fecha.getMonth() && selectedDate.getFullYear() === fecha.getFullYear() && reservas[reservaId].actividad === actividad.id ) {
                    for (let h of copia) {
                        let [hora, minuto] = h[0].split(":").map(Number);
                        if ((fecha.getHours() === hora && fecha.getMinutes() === minuto) || hora <= (fecha.getHours() + horaDur)) {
                            h[1] = true;
                        }
                    }
                }
            }
        }
        return copia;
    }

    return (
        <Container style={{marginTop: '3vh', marginBottom: '3vh'}}>
            <Row>
                <Col>
                    <Calendar
                        className="custom-calendar"
                        minDate={new Date( Date.now())}
                        onClickDay={handleDateClick}
                        value={selectedDate}
                    />
                </Col>
                <Col>
                    <Container fluid className="d-flex flex-column" style={{height: '100%'}}>
                        {loading ? <Row className='flex-grow-1'>loading</Row> :
                            <TimePicker
                                hours={hours}
                                selectedTime={(hora) => {
                                    setSelectedHour(hora);
                                }}
                            />
                        }
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

const TimePicker = ({hours, selectedTime}) => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (hour) => {
        // Actualiza el estado del botón seleccionado
        setSelectedButton(hour === selectedButton ? null : hour);
        // Llama a la función para devolver la hora seleccionada
        selectedTime(hour);
    };
    return (
        <Row className='flex-grow-1'>
            {hours.map((hour) => (
                <Col
                    key={hour[0]}
                    xs={6}
                    className="align-items-stretch timeSchedule"
                >
                    <Button
                        className={`timeButton ${hour[0] === selectedButton ? 'selected' : ''}`}
                        disabled={hour[1]}
                        onClick={() => handleButtonClick(hour[0])}
                    >
                        {hour[0]}
                    </Button>
                </Col>
            ))}
        </Row>
    );
};
