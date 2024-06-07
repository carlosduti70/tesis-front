import React, { useState } from 'react';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Table,
} from "reactstrap";
import useSWR, { mutate } from 'swr';
import { createAlzheimer, deleteAlzheimer, AlzheimerAlarm, fetchAlzheimer } from 'service/alzheimer';

function Alarmas () {

    const [mostrarNuevoAlarma, setMostrarNuevoAlarma] = useState(false);

    const toggleMostrarNuevoAlarma = () => {
        setMostrarNuevoAlarma(!mostrarNuevoAlarma);
    };

    const [estado, setEstado] = useState(null);
    const handleEstadoChange = (event) => {
        setEstado(event.target.value);
    };

    const [repite, setRepite] = useState(null);
    const handleRepiteChange = (event) => {
        setRepite(event.target.value);
    };

    const { data: alarm, error: alarmError } = useSWR(AlzheimerAlarm, fetchAlzheimer, {
        suspense: false,
    });

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [repeat, setRepeat] = useState("true");

    const handleGuardarAlarma = async () => {

        if (!title || !date || !time) {
            alert("Todos los campos son obligatorios!!");
            return;
        }

            const nuevaAlarma = {
                title: title,
                date: date,
                time: time,
                // repeat: repeat,
            };

            createAlzheimer(AlzheimerAlarm, { arg: nuevaAlarma })
      .then(response => {
        console.log('Cuidador guardado:', response);
        alert("Guardado!!");
      })
      .catch(error => {
        console.error('Error al guardar el cuidador:', error);
        alert("Error al guardar");
      });
    };
    

    // borrar datos
    const handleBorrarAlarma = async (id) => {
        try {
            // Realizar la solicitud DELETE para borrar la alarma
            await deleteAlzheimer(`${AlzheimerAlarm}/delete/${id}`, {});
            alert("Se ha borrado con éxito!!");
        
            // Actualizar la lista de alarmas después de borrar la alarma
            mutate(AlzheimerAlarm);
        } catch (error) {
            console.error("Error al borrar la alarma:", error);
            alert("Error al intentar borrar la alarma");
        }
    };

    return (
        <div className="content">
            <h1>Alarmas</h1>
            <Button onClick={toggleMostrarNuevoAlarma}>Nueva alarma</Button>

            {mostrarNuevoAlarma && (
                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Nueva alarma</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Titulo</label>
                                                <Input
                                                    id='titulo'
                                                    placeholder="Título"
                                                    type="text"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Fecha</label>
                                                <Input
                                                    id='fecha'
                                                    placeholder="Fecha"
                                                    type="date"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Hora</label>
                                                <Input
                                                    id='hora'
                                                    placeholder="Hora"
                                                    type="time"
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        {/* <Col md="6">
                                            <FormGroup>
                                                <label>Estado</label>
                                                <Input
                                                    id='repite'
                                                    type="checkbox"
                                                    checked={repeat}
                                                    onChange={(e) => setRepeat(e.target.checked)}
                                                />
                                            </FormGroup>
                                        </Col> */}
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button className="btn-fill" color="primary" onClick={handleGuardarAlarma}>
                                    Guardar
                                </Button>
                                <Button className="btn-fill" onClick={toggleMostrarNuevoAlarma}>
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
                        {alarm && alarm.map((alarma) => (
                            <tr key={alarma.id}>
                                <td>
                                    <p className="title">{alarma.title}</p>
                                    <p className="text-muted">{alarma.date}</p>
                                    <p className="text-muted">{alarma.time}</p>
                                </td>
                                <td>
                                    <Button onClick={() => handleBorrarAlarma(alarma.id)}><i className="tim-icons icon-trash-simple"/></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Alarmas;
