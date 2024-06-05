import {Button, Col, FloatingLabel, Form, Row, Modal, Container} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {Calendar} from 'react-calendar'
import {useAuth} from "../../contextProviders/AuthContext";
import {ref, set, off, onValue} from "firebase/database";
import {realDb} from "../../utils/firebaseConfig";
import {v4 as uuidv4} from 'uuid';
import 'react-calendar/dist/Calendar.css';
import './style.scss';
import {CalendarDatetimePicker} from "./CalendarDatetimePicker";
import {HiBattery100} from "react-icons/hi2"; // Importa tus estilos CSS

const Reserve = ({actividades}) => {

    const [error, setError] = useState('');

    const {currentUser} = useAuth();

    const [selectedValue, setSelectedValue] = useState(null);
    const [reserva, setReserva] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);


    const fecha = useRef();
    const actividad = useRef();
    const integrantes = useRef();
    const ovservaciones = useRef();

    const [reservas, setReservas] = useState([]);

    const handleCloseModal = () => setReserva(false);


    useEffect(() => {
        const dataRef = ref(realDb, `Reservas/`);

        const unsubscribe = onValue(dataRef, (snapshot) => {
            const newData = snapshot.val();
            console.log(newData);
            console.log(typeof (newData))
            setReservas(newData)
        });

        return () => {
            off(dataRef);
            unsubscribe();
        };

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = currentUser;
        if (user) {
            const uuid = uuidv4();
            const dataRef = ref(realDb, `Reservas/${uuid}`);
            set(dataRef, {
                user: currentUser.uid,
                fecha: fecha,
                actividad: actividades[selectedValue].id,
                integrantes: integrantes.current.value,
                ovservaciones: ovservaciones.current.value,

            }).then(() => {
                console.log('Data written successfully!');
                setReserva(true)
            }).catch((error) => {
                console.error('Error writing data: ', error);
            });
        }
    };
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }
    return (
        <>
            <Row className="pageRow">
                <Container className='reserve-form'>
                    <Row className='justify-content-center' >
                        <Col xs={12} md={8} >
                            <Form onSubmit={handleSubmit} style={{marginTop:'5vh'}}>

                                {error && <div className="error-message">{error}</div>}

                                <h1>Reserva tu actividad </h1>
                                <Form.Select value={selectedValue} onChange={handleChange}
                                             aria-label="Default select example"
                                             ref={actividad}>
                                    <option value="">Selecciona Actividad a realizar</option>
                                    {actividades.map((actividad, index) => (
                                        <option key={index} value={index}>{actividad.nombre}</option>
                                    ))}
                                </Form.Select>
                                {selectedValue !== null && selectedValue !== "" &&
                                    <>
                                        <div style={{position: 'relative'}}>
                                            <CalendarDatetimePicker reservas={reservas}
                                                                    actividad={actividades[selectedValue]}/>
                                            <FloatingLabel controlId="Integrantes" label="Integrantes"
                                                           className="mb-3 floating-label-custom">
                                                <Form.Control size="sm" type="number" placeholder="Integrantes" min='1'
                                                              ref={integrantes}
                                                              max={actividades[selectedValue].maximoIntegrantes}
                                                              required/>
                                            </FloatingLabel>
                                            <FloatingLabel controlId="Comentarios" label="Añade Observaciones"
                                                           className="mb-3 floating-label-custom">
                                                <Form.Control size="sm" as="textarea" placeholder="Observaciones "
                                                              ref={ovservaciones}/>
                                            </FloatingLabel>
                                        </div>
                                    </>
                                }
                                <Button variant="primary" type="submit"
                                        style={{alignSelf: 'flex-start'}}>Reserva</Button>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </Row>
            <Modal show={reserva} onHide={handleCloseModal}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Reserva Exitosa</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Has reservado con exito descarga una factura</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary">Close</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    );
}

export default Reserve;
