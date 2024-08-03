import React, { useState } from 'react';
import {
    Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col, Container, FormFeedback
} from 'reactstrap';
import { patientAlzheimer, AlzheimerPatient } from 'service/alzheimer';
// import Notifications, { notify } from "views/notificaciones";
import { useNavigate } from 'react-router-dom';

function RegistroPaciente() {
    const [stage, setStage] = useState("Inicial");
    const [name, setName] = useState("");
    const [lastName, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [dateDiagnosis, setDateDiagnosis] = useState("");
    const [touched, setTouched] = useState({
        name: false,
        lastName: false,
        age: false,
        address: false,
        dateDiagnosis: false,
    });
    const navigate = useNavigate();

    const handleGuardarPaciente = () => {
        const newTouched = {
            name: true,
            lastName: true,
            age: true,
            address: true,
            dateDiagnosis: true,
        };
        setTouched(newTouched);

        if (!name || !lastName || !age || !address || !dateDiagnosis || !stage) {
            // notify("Todos los campos son obligatorios!!", "warning", "tc");
            return;
        }

        const paciente = {
            name: name,
            lastName: lastName,
            age: age,
            address: address,
            dateDiagnosis: dateDiagnosis,
            stage: stage
        };

        patientAlzheimer(AlzheimerPatient, paciente)
            .then(response => {
                console.log('Paciente guardado:', response);
                // notify("Creado!!", "success", "tc");
            })
            .catch(error => {
                console.error('Error al guardar el paciente:', error);
                // notify("Error al guardar!!", "danger", "tc");
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
                            <h4 className="title display-5">Crear paciente</h4>
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
                                        value={lastName}
                                        onChange={(e) => setLastname(e.target.value)}
                                        onBlur={handleBlur('lastName')}
                                        invalid={touched.lastName && !lastName}
                                    />
                                    <FormFeedback>El apellido es obligatorio</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Fecha de nacimiento</label>
                                    <Input
                                        placeholder="Fecha de nacimiento"
                                        type="date"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        onBlur={handleBlur('age')}
                                        invalid={touched.age && !age}
                                    />
                                    <FormFeedback>La fecha de nacimiento es obligatoria</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Fecha de primer diagnóstico</label>
                                    <Input
                                        placeholder="Fecha de primer diagnóstico"
                                        type="date"
                                        value={dateDiagnosis}
                                        onChange={(e) => setDateDiagnosis(e.target.value)}
                                        onBlur={handleBlur('dateDiagnosis')}
                                        invalid={touched.dateDiagnosis && !dateDiagnosis}
                                    />
                                    <FormFeedback>La fecha de diagnóstico es obligatoria</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Dirección</label>
                                    <Input
                                        placeholder="Dirección de vivienda"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        onBlur={handleBlur('address')}
                                        invalid={touched.address && !address}
                                    />
                                    <FormFeedback>La dirección es obligatoria</FormFeedback>
                                </FormGroup>
                                {/* <Notifications /> */}
                                <div className="d-flex justify-content-between">
                                    <Button color="secondary" onClick={handleCreateAccount}>
                                        Atrás
                                    </Button>
                                    <Button color="primary" onClick={handleGuardarPaciente}>
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
