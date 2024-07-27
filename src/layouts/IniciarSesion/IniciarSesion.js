import React, { useState } from "react";
import {
    Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Container, Row, Col, Spinner, FormFeedback
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Notifications, { notify } from "views/notificaciones";
import { authenticate, baseUrl } from "service/alzheimer";
import {jwtDecode} from "jwt-decode";
import { useData } from "contexts/DataContext"; // Ajusta la ruta a tu archivo DataContext

const IniciarSesion = () => {
    const navigate = useNavigate();
    const { setData } = useData();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(false); // Estado para manejar el formulario inválido
    const [touched, setTouched] = useState({
        username: false,
        password: false,
    });

    const handleLogin = async () => {
        setLoading(true);
        setInvalid(false); // Resetea el estado de invalidez antes de intentar iniciar sesión
        const newTouched = {
            username: true,
            password: true,
        };
        setTouched(newTouched);

        if (!username || !password) {
            // notify("Todos los campos son obligatorios!!", "warning", "tc");
            setInvalid(true);
            setLoading(false);
            return;
        }

        try {
            const token = await authenticate(username, password);
            localStorage.setItem('token', token);

            const claims = jwtDecode(token);
            const response = await fetch(`${baseUrl}/patient/get-home/${claims.sub}`);
            const dto = await response.json();

            localStorage.setItem('dto', JSON.stringify(dto));
            setData({ token, claims, dto });

            navigate('/admin');
            // notify("¡Bienvenido!", "success", "tc");
        } catch (error) {
            setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            setInvalid(true); // Marca el formulario como inválido
            // notify("¡Credenciales incorrectas!", "danger", "tc");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAccount = () => {
        setTimeout(() => {
            navigate('/patientrecord');
        }, 500);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin();
        }
    };

    const handleBlur = (field) => () => {
        setTouched({
            ...touched,
            [field]: true,
        });
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Col md="6" lg="5">
                    <div className="text-center mb-4">
                        <h1 className="facebook-text">ReminderTEC</h1>
                        <p>ReminderTEC te ayuda a recordar alarmas y recordatorios para estar pendiente de las personas que forman parte de tu vida.</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center" style={{ marginBottom: '8vh' }}>
                        {loading && <Spinner />}
                    </div>
                    <Card className="shadow-sm">
                        <CardHeader className="text-center text-white">
                            <h5 className="title">Iniciar Sesión</h5>
                        </CardHeader>
                        <CardBody>
                            <Form onKeyPress={handleKeyPress}>
                                <FormGroup>
                                    <Label for="username">Usuario</Label>
                                    <Input
                                        type="text"
                                        id="username"
                                        placeholder="Ingresa tu nombre de usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={handleBlur('username')}
                                        invalid={touched.username && !username || invalid} // Marca el campo como inválido si hay error
                                    />
                                    <FormFeedback>{error ? "" : "El usuario es obligatorio."}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Contraseña</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={handleBlur('password')}
                                        invalid={touched.password && !password || invalid} // Marca el campo como inválido si hay error
                                    />
                                    <FormFeedback>{error ? "Nombre de Usuario o Contraseña Incorrecta." : "La contraseña es obligatoria."}</FormFeedback>
                                </FormGroup>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Button color="primary" onClick={handleLogin} disabled={loading}>
                                        Iniciar Sesión
                                    </Button>
                                    <Button color="secondary" onClick={handleCreateAccount}>
                                        Crear cuenta
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* <Notifications /> */}
        </Container>
    );
};

export default IniciarSesion;
