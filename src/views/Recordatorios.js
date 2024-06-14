import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col, Table, CardFooter } from "reactstrap";
import useSWR, { mutate } from 'swr';
import { createAlzheimer, deleteAlzheimer, AlzheimerReminders, fetchAlzheimer } from 'service/alzheimer';
import Notifications, {notify} from './notificaciones';

function Recordatorios() {
    const [mostrarNuevoRecordatorio, setMostrarNuevoRecordatorio] = useState(false);
    const [title, setTitle] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [estado, setEstado] = useState("Activado");

    const toggleMostrarNuevoRecordatorio = () => {
        setMostrarNuevoRecordatorio(!mostrarNuevoRecordatorio);
    };



    const handleGuardarRecordatorio = async () => {

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
        };

        setTimeout(() => {
            setMostrarNuevoRecordatorio(!mostrarNuevoRecordatorio);
        }, 2000);

        createAlzheimer(AlzheimerReminders, { arg: nuevoRecordatorio })
            .then(response => {
                console.log('Recordatorio guardado:', response);
                notify("Guardado", "success", "tc");
                mutate(AlzheimerReminders);
            })
            .catch(error => {
                console.error('Error al guardar el recordatorio:', error);
                notify("Error al guardar", "danger", "tc");
            });
    };

    const { data: reminders } = useSWR(AlzheimerReminders, fetchAlzheimer, { suspense: false });

    const handleBorrarRecordatorio = async (id) => {
        try {
            await deleteAlzheimer(`${AlzheimerReminders}/delete/${id}`, {});
            mutate(AlzheimerReminders);
        } catch (error) {
            alert("Error al intentar borrar la recordatorio");
            console.error("Error al borrar el recordatorio:", error);
        }
    };

//         // Recordatorios pasados
//     const currentDateTime = new Date();

//     const pastReminders = reminders.filter(reminder => {
//     const reminderDateTime = new Date(reminder.dateTime); // Asegúrate de que `reminder.dateTime` sea un string de fecha válido
//     return reminderDateTime < currentDateTime;
//   }); // Asegúrate de que `reminder.dateTime` sea un string de fecha válido
//     return reminderDateTime < currentDateTime;

    return (
        <div className="content">
            <h1>Recordatorios</h1>
            <Button onClick={toggleMostrarNuevoRecordatorio}>Nuevo recordatorio</Button>

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
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
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
                                                    onChange={(e) => setDescripcion(e.target.value)}
                                                />
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
                                                    onChange={(e) => setFecha(e.target.value)}
                                                />
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
                                                    onChange={(e) => setHoraInicio(e.target.value)}
                                                />
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
                                                    onChange={(e) => setHoraFin(e.target.value)}
                                                />
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
                                                    onChange={(e) => setEstado(e.target.value)}>
                                                    <option value="Activado">Activado</option>
                                                    <option value="Desactivado">Desactivado</option>
                                                </Input>
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

            <div className="table-full-width table-responsive">
                <Table>
                    <tbody>
                        <h4>Recordatorios Activos</h4>
                        {reminders && reminders.map((recordatorio) => (
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
                    {/* <tbody>
                        <h4>Recordatorios Pasados</h4>
                        {reminders && reminders.map((recordatorio) => (
                            <tr key={recordatorio.id}>
                                <td>
                                    <p className="title">{recordatorio.title}</p>
                                    <p className="text-muted">{recordatorio.description}</p>
                                    <p className="text-muted">{recordatorio.date}</p>
                                    <p className="text-muted">{`${recordatorio.startTime} -- ${recordatorio.endTime}`}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                </Table>
            </div>
            
        </div>
    );
}

export default Recordatorios;
