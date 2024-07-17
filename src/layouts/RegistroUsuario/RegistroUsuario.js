import React, { useState } from 'react';
import {
    Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col, Container, FormFeedback
} from 'reactstrap';
import { createAlzheimer, AlzheimerCaragivers } from 'service/alzheimer';
import { useNavigate } from 'react-router-dom';
// import Notifications, { notify } from "views/notificaciones";

function RegistroCaragivers() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [rol, setRol] = useState("admin");
    const [touched, setTouched] = useState({
        username: false,
        password: false,
        name: false,
        lastname: false,
        rol: false,
    });
    const navigate = useNavigate();

    const handleGuardarCuidadores = () => {
        const newTouched = {
            username: true,
            password: true,
            name: true,
            lastname: true,
            rol: true,
        };
        setTouched(newTouched);

        if (!name || !lastname || !username || !rol || !password) {
            // notify("Todos los campos son obligatorios!!", "warning", "tc");
            return;
        }

        const cuidador = {
            username: username,
            password: password,
            name: name,
            lastName: lastname
        };

        createAlzheimer(AlzheimerCaragivers, { arg: cuidador })
            .then(response => {
                console.log('Cuidador guardado:', response);
                // notify("Guardado!!", "success", "tc");
            })
            .catch(error => {
                console.error('Error al guardar el cuidador:', error);
                // notify("Error al guardar", "danger", "tc");
            });

        navigate('/admin');
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
                    <Card className="shadow-sm">
                        <CardHeader className="text-center text-white">
                            <h5 className="title">Crear Cuenta</h5>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <label>Nombre</label>
                                    <Input
                                        placeholder="Nombre"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onBlur={handleBlur('name')}
                                        invalid={touched.name && !name}
                                    />
                                    <FormFeedback>El nombre es obligatorio</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Apellido</label>
                                    <Input
                                        placeholder="Apellido"
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        onBlur={handleBlur('lastname')}
                                        invalid={touched.lastname && !lastname}
                                    />
                                    <FormFeedback>El apellido es obligatorio</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Nombre de usuario</label>
                                    <Input
                                        placeholder="Nombre de usuario"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={handleBlur('username')}
                                        invalid={touched.username && !username}
                                    />
                                    <FormFeedback>El nombre de usuario es obligatorio</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Contraseña</label>
                                    <Input
                                        placeholder="Contraseña"
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={handleBlur('password')}
                                        invalid={touched.password && !password}
                                    />
                                    <FormFeedback>La contraseña es obligatoria</FormFeedback>
                                </FormGroup>
                                {/* <Notifications /> */}
                                <div className="d-flex justify-content-end">
                                    <Button color="primary" onClick={handleGuardarCuidadores}>
                                        Guardar
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RegistroCaragivers;
