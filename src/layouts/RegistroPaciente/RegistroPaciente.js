import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col, Container } from 'reactstrap';
import { createAlzheimer, AlzheimerPatient } from 'service/alzheimer';

function RegistroPaciente() {
    const [stage, setStage] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [dateDiagnosis, setDateDiagnosis] = useState("");

    const handleGuardarPaciente = () => {
        if (!name || !lastname || !age || !address || !dateDiagnosis || !stage) {
            alert("Todos los campos son obligatorios!!");
            return;
        }
        const paciente = {
            name: name,
            lastName: lastname,
            age: age,
            address: address,
            dateDiagnosis: dateDiagnosis,
            stage: stage
        };

        createAlzheimer(AlzheimerPatient, { arg: paciente })
            .then(response => {
                console.log('Paciente guardado:', response);
                alert("Guardado!!");
            })
            .catch(error => {
                console.error('Error al guardar el paciente:', error);
                alert("Error al guardar");
            });
    };

    return (
        <Container className="login-container">
<Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <Col md="6" lg="5">
    <Card className="shadow-sm">
        <CardHeader className="text-center text-white">
        <h5 className="title">Crear paciente</h5>
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
                                    <label>Fecha de nacimiento</label>
                                    <Input
                                        placeholder="Fecha de nacimiento"
                                        type="date"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Fecha de primer diagnóstico</label>
                                    <Input
                                        placeholder="Fecha de primer diagnóstico"
                                        type="date"
                                        value={dateDiagnosis}
                                        onChange={(e) => setDateDiagnosis(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Dirección</label>
                                    <Input
                                        placeholder="Dirección de vivienda"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Etapa de Alzheimer</label>
                                    <Input
                                        placeholder="Etapa"
                                        type="text"
                                        value={stage}
                                        onChange={(e) => setStage(e.target.value)}
                                    />
                                </FormGroup>
                            <div className="d-flex justify-content-between">

                                <Button color="primary" onClick={handleGuardarPaciente}>
                                    Guardar
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
}

export default RegistroPaciente;

