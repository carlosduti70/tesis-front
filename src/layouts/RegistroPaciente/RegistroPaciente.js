import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col } from 'reactstrap';
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
        <div className="content d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '50%' }}>
                <CardHeader>
                    <h5 className="h4">Registro de paciente</h5>
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
                                    <label>Fecha de nacimiento</label>
                                    <Input
                                        placeholder="Fecha de nacimiento"
                                        type="date"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup>
                                    <label>Fecha de primer diagnóstico</label>
                                    <Input
                                        placeholder="Fecha de primer diagnóstico"
                                        type="date"
                                        value={dateDiagnosis}
                                        onChange={(e) => setDateDiagnosis(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup>
                                    <label>Dirección</label>
                                    <Input
                                        placeholder="Dirección de vivienda"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup>
                                    <label>Etapa de Alzheimer</label>
                                    <Input
                                        placeholder="Etapa"
                                        type="text"
                                        value={stage}
                                        onChange={(e) => setStage(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className="d-flex justify-content-between">
                                <Button color="primary" onClick={handleGuardarPaciente}>
                                    Guardar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default RegistroPaciente;
