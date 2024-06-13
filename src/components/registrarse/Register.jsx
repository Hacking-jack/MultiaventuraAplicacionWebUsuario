// src/components/Auth/Register.jsx
import {useState, useRef} from 'react';
import {Button, FloatingLabel, Form, Row, Col, InputGroup} from "react-bootstrap";
import {BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import './style.scss';
import {useAuth} from "../../contextProviders/AuthContext";
import {collection, addDoc} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const username = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {signup} = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        console.log(setShowConfirmPassword(!showConfirmPassword));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError('')
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            const user = await signup(emailRef.current.value, passwordRef.current.value)

            // Añadir datos adicionales del usuario a Firestore
            await addDoc(collection(db, 'users'), {
                user_id: user.uid,
                comentarios: 'Reservar',
                display_name: username.current.value,
                telefono: '',
                createdAt: new Date(),
            });

            console.log('User logged in and data added to Firestore:', user);
            navigate('/')
        } catch (error) {
            setError('Failed to log in and add data to Firestore');
        }
    }

    return (
            <Row className='justify-content-center pageRow '>
                <Col xs={12} md={8}>
                    <Form onSubmit={handleSubmit} style={{padding: '15%'}}>
                        {error && <div className="error-message">{error}</div>}

                        <FloatingLabel controlId="floatingName" label="Nombre" className="mb-3 floating-label-custom">
                            <Form.Control size="sm" type="text" placeholder="Nombre" ref={username} required/>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingEmail" label="Correo Electrónico"
                                       className="mb-3 floating-label-custom">
                            <Form.Control size="sm" type="email" placeholder="Correo Electrónico" ref={emailRef}
                                          required/>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword"
                                       className="mb-3 floating-label-custom">
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Contraseña'
                                    ref={passwordRef}
                                    required
                                />
                                <Button variant="outline-secondary" onClick={togglePasswordVisibility}
                                        style={{border: '1px solid ', borderColor: "white"}}>
                                    {showPassword ? <BsFillEyeSlashFill style={{color: "white",}}/> :
                                        <BsFillEyeFill style={{color: "white"}}/>}
                                </Button>
                            </InputGroup>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingConfirmPassword"
                                       className="mb-3 floating-label-custom">
                            <InputGroup>
                                <Form.Control
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder='Confirmar Contraseña'
                                    ref={confirmPasswordRef}
                                    required
                                />
                                <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility}
                                        style={{border: "1px solid", borderColor: "white"}}>
                                    {showConfirmPassword ? <BsFillEyeSlashFill style={{color: "white",}}/> :
                                        <BsFillEyeFill style={{color: "white"}}/>}
                                </Button>
                            </InputGroup>
                        </FloatingLabel>

                        <Button variant="primary" type="submit">
                            Registrarse
                        </Button>
                    </Form>
                </Col>
            </Row>
    );
}

export default Register;
