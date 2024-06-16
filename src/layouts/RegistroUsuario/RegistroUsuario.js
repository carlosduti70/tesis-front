import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col, Container } from 'reactstrap';
import { createAlzheimer, AlzheimerCaragivers } from 'service/alzheimer';
import { useNavigate } from 'react-router-dom';
import Notifications, {notify} from "views/notificaciones";


function RegistroCaragivers() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [rol, setRol] = useState("");
    const navigate = useNavigate();

    const handleCreatePatient = () => {
        setTimeout(() => {
            navigate('/patientrecord');
        }, 1000);
    }


    const handleGuardarCuidadores = () => {
        if (!name || !lastname || !username || !email || !rol || !password) {
            notify("Todos los campos son obligatorios!!", "warning", "tc");
            return;
        }
        const cuidador = {
            username: username,
            password: password,
            gmail: email,
            name: name,
            lastName: lastname,
            rol: rol
        };



        createAlzheimer(AlzheimerCaragivers, { arg: cuidador })
            .then(response => {
                console.log('Cuidador guardado:', response);
                alert("Guardado!!");
            })
            .catch(error => {
                console.error('Error al guardar el cuidador:', error);
                alert("Error al guardar");
            });
            navigate('/admin');
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
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Apellido</label>
                                    <Input
                                        placeholder="Apellido"
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Nombre de usuario</label>
                                    <Input
                                        placeholder="Nombre de usuario"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Correo Electrónico</label>
                                    <Input
                                        placeholder="ejemplo@gmail.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormGroup>
                            <FormGroup>
                                <label>Contraseña</label>
                                <Input
                                    placeholder="Contraseña"
                                    type= 'password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormGroup>
                                <FormGroup>
                                    <label>Rol</label>
                                    <Input
                                        type="select"
                                        name="rol"
                                        id="rol"
                                        value={rol}
                                        onChange={(e) => setRol(e.target.value)}>
                                        <option value="Admin">Administrador</option>
                                        <option value="Cuidador">Cuidador</option>
                                    </Input>
                                </FormGroup>
                        <Notifications />
                        <div className="d-flex justify-content-between">

                                <Button color="secondary" onClick={handleGuardarCuidadores}>
                                    Comprobar
                                </Button>
                                <Button color="primary" onClick={handleCreatePatient}>
                                    Siguiente
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
