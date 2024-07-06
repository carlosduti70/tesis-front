import React, { useState } from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Container, Row, Col, Spinner } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar el archivo CSS
import { useNavigate } from 'react-router-dom';
import Notifications, { notify } from "views/notificaciones";
import { authenticate } from "service/alzheimer";

const IniciarSesion = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Mover el estado de carga aquí

    const handleLogin = async () => {
        setLoading(true); // Establecer el estado de carga a true
        try {
            const token = await authenticate(username, password);
            // Aquí puedes guardar el token en el almacenamiento local (localStorage) o en el estado global de tu aplicación si estás usando un contexto
            navigate('/admin');
            notify("¡Bienvenido!", "success", "tc");
        } catch (error) {
            setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            notify("¡Credenciales incorrectas!", "danger", "tc");
        } finally {
            setLoading(false); // Establecer el estado de carga a false
        }
    };

    const handleCreateAccount = () => {
        setTimeout(() => {
            navigate('/patientrecord');
        }, 500);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Previene el comportamiento predeterminado del formulario
            handleLogin(); // Llama a la función handleLogin cuando se presiona Enter
        }
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Col md="6" lg="5">
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
                                    <Label for="email">Usuario</Label>
                                    <Input
                                        type="text"
                                        id="username"
                                        placeholder="Ingresa tu nombre de usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Contraseña</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
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
            <Notifications />
        </Container>
    );
};

export default IniciarSesion;
