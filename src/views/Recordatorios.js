import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col, Table, CardFooter, FormFeedback } from "reactstrap";
import useSWR, { mutate } from 'swr';
import { createAlzheimer, deleteAlzheimer, AlzheimerReminders, fetchAlzheimer } from 'service/alzheimer';
import Notifications, { notify } from './notificaciones';
import { useData } from 'contexts/DataContext';

function Recordatorios() {
    const [mostrarNuevoRecordatorio, setMostrarNuevoRecordatorio] = useState(false);
    const { data } = useData(); // Obtener los datos del contexto

    const toggleMostrarNuevoRecordatorio = () => {
        setMostrarNuevoRecordatorio(!mostrarNuevoRecordatorio);
    };

    const [title, setTitle] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [estado, setEstado] = useState("Activado");

    const [invalid, setInvalid] = useState({
        title: false,
        descripcion: false,
        fecha: false,
        horaInicio: false,
        horaFin: false,
        estado: false,
    });

    const handleGuardarRecordatorio = async () => {
        const newInvalid = {
            title: !title,
            descripcion: !descripcion,
            fecha: !fecha,
            horaInicio: !horaInicio,
            horaFin: !horaFin,
            estado: !estado,
        };
        setInvalid(newInvalid);

        if (!title || !descripcion || !fecha || !horaInicio || !horaFin || !estado) {
            notify("Todos los campos son obligatorios!!", "warning", "tc");
            return;
        }

        const nuevoRecordatorio = {
            title: title,
            description: descripcion,
            date: fecha,
            startTime: horaInicio,
            endTime: horaFin,
            status: estado,
            patientId: data.dto?.patientId // Incluir patientId
        };

        setTimeout(() => {
            setMostrarNuevoRecordatorio(!mostrarNuevoRecordatorio);
        }, 2000);

        try {
            await createAlzheimer(AlzheimerReminders, nuevoRecordatorio);
            notify("Guardado", "success", "tc");
            mutate(AlzheimerReminders);
        } catch (error) {
            console.error('Error al guardar el recordatorio:', error);
            notify("Error al guardar", "danger", "tc");
        }
    };

    const { data: reminders } = useSWR(AlzheimerReminders, fetchAlzheimer, { suspense: false });

    const handleBorrarRecordatorio = async (id) => {
        try {
            await deleteAlzheimer(`${AlzheimerReminders}/delete/${id}`, {});
            mutate(AlzheimerReminders);
        } catch (error) {
            alert("Error al intentar borrar el recordatorio");
            console.error("Error al borrar el recordatorio:", error);
        }
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
        if (e.target.value) {
            setInvalid((prev) => ({ ...prev, title: false }));
        }
    };

    const handleChangeDescripcion = (e) => {
        setDescripcion(e.target.value);
        if (e.target.value) {
            setInvalid((prev) => ({ ...prev, descripcion: false }));
        }
    };

    const handleChangeFecha = (e) => {
        setFecha(e.target.value);
        if (e.target.value) {
            setInvalid((prev) => ({ ...prev, fecha: false }));
        }
    };

    const handleChangeHoraInicio = (e) => {
        setHoraInicio(e.target.value);
        if (e.target.value) {
            setInvalid((prev) => ({ ...prev, horaInicio: false }));
        }
    };

    const handleChangeHoraFin = (e) => {
        setHoraFin(e.target.value);
        if (e.target.value) {
            setInvalid((prev) => ({ ...prev, horaFin: false }));
        }
    };

    const handleChangeEstado = (e) => {
        setEstado(e.target.value);
        if (e.target.value) {
            setInvalid((prev) => ({ ...prev, estado: false }));
        }
    };

    return (
        <div className="content">
            <Button onClick={toggleMostrarNuevoRecordatorio} style={{ marginBottom: "3vh" }}>Nuevo recordatorio</Button>

            {mostrarNuevoRecordatorio && (
                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Nuevo recordatorio</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Recuérdame</label>
                                                <Input
                                                    id='titulo'
                                                    placeholder="Título"
                                                    type="text"
                                                    value={title}
                                                    onChange={handleChangeTitle}
                                                    invalid={invalid.title}
                                                />
                                                <FormFeedback>El título es obligatorio.</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-md-1" md="6">
                                            <FormGroup>
                                                <label>Descripción</label>
                                                <Input
                                                    id='descripcion'
                                                    placeholder="Descripción"
                                                    type="text"
                                                    value={descripcion}
                                                    onChange={handleChangeDescripcion}
                                                    invalid={invalid.descripcion}
                                                />
                                                <FormFeedback>La descripción es obligatoria.</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Fecha</label>
                                                <Input
                                                    id='fecha'
                                                    placeholder="Fecha"
                                                    type="date"
                                                    value={fecha}
                                                    onChange={handleChangeFecha}
                                                    invalid={invalid.fecha}
                                                />
                                                <FormFeedback>La fecha es obligatoria.</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Hora Inicio</label>
                                                <Input
                                                    id='horaInicio'
                                                    placeholder="Hora Inicio"
                                                    type="time"
                                                    value={horaInicio}
                                                    onChange={handleChangeHoraInicio}
                                                    invalid={invalid.horaInicio}
                                                />
                                                <FormFeedback>La hora de inicio es obligatoria.</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Hora Fin</label>
                                                <Input
                                                    id='horaFin'
                                                    placeholder="Hora Fin"
                                                    type="time"
                                                    value={horaFin}
                                                    onChange={handleChangeHoraFin}
                                                    invalid={invalid.horaFin}
                                                />
                                                <FormFeedback>La hora de fin es obligatoria.</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="6">
                                            <FormGroup>
                                                <label>Estado</label>
                                                <Input
                                                    type="select"
                                                    name="estado"
                                                    id="estado"
                                                    value={estado}
                                                    onChange={handleChangeEstado}
                                                    invalid={invalid.estado}
                                                >
                                                    <option value="Activado">Activado</option>
                                                    <option value="Desactivado">Desactivado</option>
                                                </Input>
                                                <FormFeedback>El estado es obligatorio.</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Notifications />
                                <Button className="btn-fill" color="primary" onClick={handleGuardarRecordatorio}>
                                    Guardar
                                </Button>
                                <Button className="btn-fill" onClick={toggleMostrarNuevoRecordatorio}>
                                    Cancelar
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            )}

            {!mostrarNuevoRecordatorio && (
                <div className="table-full-width table-responsive">
                    <Table>
                        <tbody>
                            <h4>Recordatorios Activos</h4>
                            {reminders && reminders.filter(recordatorio => recordatorio.patientId === data.dto?.patientId).map((recordatorio) => (
                                <tr key={recordatorio.id}>
                                    <td>
                                        <p className="title">{recordatorio.title}</p>
                                        <p className="text-muted">{recordatorio.description}</p>
                                        <p className="text-muted">{recordatorio.date}</p>
                                        <p className="text-muted">{`${recordatorio.startTime} -- ${recordatorio.endTime}`}</p>
                                    </td>
                                    <td>
                                        <Button onClick={() => handleBorrarRecordatorio(recordatorio.id)}><i className="tim-icons icon-trash-simple" /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default Recordatorios;
