import React, { useState } from 'react';
import useSWR from 'swr';
import { mutate } from 'swr';
import { Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col, Table } from "reactstrap";
import { createAlzheimer, AlzheimerPatient, fetchAlzheimer, deleteAlzheimer } from 'service/alzheimer';

function RegistroPaciente() {
    const [stage, setStage] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [dateDiagnosis, setDateDiagnosis] = useState("");

    const handleEtapaChange = (event) => {
        setStage(event.target.value);
    };

    const handleGuardarPaciente = () => {

        if (!name || !lastname || !age || !address || !dateDiagnosis || !stage) {
            alert("Todos los campos son obligatorios!!");
            return;
        }
        const paciente = {
            name: name,
            lastName: lastname,
            age: age,
            address:address,
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

    const { data: patient, error: patientError } = useSWR(AlzheimerPatient, fetchAlzheimer, {
      suspense: false,
    });

    const handleBorrarPatient = async (id) => {
      try {
        await deleteAlzheimer(`${AlzheimerPatient}/delete/${id}`, {});
        alert("Se ha borrado con éxito!!");
        mutate(AlzheimerPatient);
      } catch (error) {
        console.error("Error al borrar el caragivers:", error);
        alert("Error al intentar borrar caragivers");
      }
    };
    
    const [mostrarNuevopaciente, setMostrarNuevocaragivers] = useState(false);
    const toggleMostrarNuevopaciente = () => {
      setMostrarNuevocaragivers(!mostrarNuevopaciente);
    };

    return (
        <>
            <div className="content">
            <h1>Pacientes</h1>
        <Button onClick={toggleMostrarNuevopaciente}>Nuevo paciente</Button>
        {mostrarNuevopaciente && (
                <Card>
                    <CardHeader>
                        <h5 className="title">Registro de paciente</h5>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col className="pr-md-1" md="3">
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
                                <Col className="px-md-1" md="3">
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
                                <Col className="pr-md-1" md="3">
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
                                <Col className="px-md-1" md="3">
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
                            </Row>
                            <Row>
                            <Col className="pr-md-1" md="6">
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
                                <Col className="pr-md-1" md="6">
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
                                <Col md="8">
                                    <Button color="primary" onClick={handleGuardarPaciente}>
                                        Guardar
                                    </Button>
                                    <Button onClick={toggleMostrarNuevopaciente}>
                                        Cancelar
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
                )}
                <div className="table-full-width table-responsive">
          <Table>
            <tbody>
              {patient && patient.content.map((patients) => (
                <tr key={patients.id}>
                  <td>
                    <p className="title">{`${patients.name} ${patients.lastName}`}</p>
                    <p className="text-muted">{patients.gmail}</p>
                  </td>
                  <td>
                    <Button onClick={() => handleBorrarPatient(patients.id)}><i className="tim-icons icon-trash-simple" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
            </div>
        </>
    )
}

export default RegistroPaciente;
