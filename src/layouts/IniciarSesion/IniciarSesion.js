import React, { useState } from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar el archivo CSS
import { useNavigate } from 'react-router-dom';
import Notifications, {notify} from "views/notificaciones";

const IniciarSesion = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = () => {
        setTimeout(() => {
            navigate('/admin');
        }, 1000);
    };
    

    const handleCreateAccount = () => {
        setTimeout(() => {
            navigate('/userregister');
        }, 800);
    };

return (
    <Container className="login-container">
    <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Col md="6" lg="5">
        <Card className="shadow-sm">
            <CardHeader className="text-center text-white">
            <h5 className="title">Iniciar Sesión</h5>
            </CardHeader>
            <CardBody>
            <Form>
                <FormGroup>
                <Label for="username">Usuario</Label>
                <Input
                    type="text"
                    id="username"
                    placeholder="Ingresa tu usuario"
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
                <div className="d-flex justify-content-between">
                    <Button color="primary" onClick={handleLogin}>
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
