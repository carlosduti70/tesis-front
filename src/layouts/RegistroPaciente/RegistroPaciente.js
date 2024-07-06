import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col, Container } from 'reactstrap';
import { createAlzheimer, AlzheimerPatient } from 'service/alzheimer';
import Notifications, {notify} from "views/notificaciones";
import { useNavigate } from 'react-router-dom';

function RegistroPaciente() {
    const [stage, setStage] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [dateDiagnosis, setDateDiagnosis] = useState("");
    const navigate = useNavigate();

    const handleGuardarPaciente = () => {
        if (!name || !lastname || !age || !address || !dateDiagnosis || !stage) {
            notify("Todos los campos son obligatorios!!", "warning", "tc");
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
                notify("Creado!!", "success", "tc");;
            })
            .catch(error => {
                console.error('Error al guardar el paciente:', error);
                notify("Error al guardar!!", "danger", "tc");
            });
            setTimeout(() => {
                navigate('/userregister');
            }, 800);

        };
        const handleCreateAccount = () => {
            setTimeout(() => {
                navigate('/login');
            }, 500);
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
                                        type="select"
                                        name="stage"
                                        id="stage"
                                        value={stage}
                                        onChange={(e) => setStage(e.target.value)}>
                                        <option value="Admin">Inicial</option>
                                        <option value="user">pollo</option>
                                    </Input>
                                </FormGroup>
                                <Notifications />
                            <div className="d-flex justify-content-between">
                                <Button color="secondary" onClick={handleCreateAccount}>
                                    Atrás
                                </Button>
                                <Button color="primary" onClick= {handleGuardarPaciente}>
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

export default RegistroPaciente;

