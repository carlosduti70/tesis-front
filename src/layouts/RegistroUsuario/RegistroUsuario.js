import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col } from 'reactstrap';
import { createAlzheimer, AlzheimerCaragivers } from 'service/alzheimer';
import { useNavigate } from 'react-router-dom';

function RegistroCaragivers() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [parentezco, setParentezco] = useState("");
    const navigate = useNavigate();

    const handleGuardarCuidadores = () => {
        if (!name || !lastname || !username || !email || !parentezco) {
            alert("Todos los campos son obligatorios!!");
            return;
        }
        const cuidador = {
            name: name,
            lastName: lastname,
            userName: username,
            gmail: email,
            relationship: parentezco
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
        <div className="content d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '50%' }}>
                <CardHeader>
                    <h5 className="h4">Registro</h5>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <label>Nombre</label>
                                    <Input
                                        placeholder="Nombre"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup>
                                    <label>Apellido</label>
                                    <Input
                                        placeholder="Apellido"
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup>
                                    <label>Nombre de usuario</label>
                                    <Input
                                        placeholder="Nombre de usuario"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup>
                                    <label>Correo Electrónico</label>
                                    <Input
                                        placeholder="example@gmail.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup>
                                    <label>Parentezco con el paciente</label>
                                    <Input
                                        type="select"
                                        name="parentezco"
                                        id="parentezco"
                                        value={parentezco}
                                        onChange={(e) => setParentezco(e.target.value)}>
                                        <option value="">Seleccionar</option>
                                        <option value="Paciente">Paciente</option>
                                        <option value="Familia">Familiar</option>
                                        <option value="Cuidador">Cuidador</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className="d-flex justify-content-between">
                                <Button color="primary" onClick={handleGuardarCuidadores}>
                                    Guardar
                                </Button>
                            </Col>
                            <Col md="12" className="d-flex justify-content-between">
                                <Button color="primary" onClick={handleGuardarCuidadores}>
                                    Agregar Cuidador
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default RegistroCaragivers;
