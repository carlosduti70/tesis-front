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
    FormFeedback
} from "reactstrap";
import useSWR, { mutate } from 'swr';
import { createAlzheimer, deleteAlzheimer, AlzheimerAlarm, fetchAlzheimer } from 'service/alzheimer';
import Notifications, { notify } from './notificaciones';
import { useData } from 'contexts/DataContext';

function Alarmas() {
    const [mostrarNuevoAlarma, setMostrarNuevoAlarma] = useState(false);
    const { data } = useData(); // Obtén los datos del contexto

    const toggleMostrarNuevoAlarma = () => {
        setMostrarNuevoAlarma(!mostrarNuevoAlarma);
    };

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [repeat, setRepeat] = useState(true);

    const [invalid, setInvalid] = useState({
        title: false,
        date: false,
        time: false,
    });

    const { data: alarm } = useSWR(AlzheimerAlarm, fetchAlzheimer, {
        suspense: false,
    });

    const handleGuardarAlarma = async () => {
        const newInvalid = {
            title: !title,
            date: !date,
            time: !time,
        };
        setInvalid(newInvalid);

        if (!title || !date || !time) {
            notify("Todos los campos son obligatorios!!", "warning", "tc");
            return;
        }

        const nuevaAlarma = {
            title: title,
            date: date,
            time: time,
            patientId: data.dto?.patientId
        };

        setTimeout(() => {
            setMostrarNuevoAlarma(false);
        }, 2000);

        try {
            await createAlzheimer(AlzheimerAlarm, nuevaAlarma);
            notify("Guardado", "success", "tc");
            mutate(AlzheimerAlarm);
        } catch (error) {
            console.error('Error al guardar la alarma:', error);
            notify("Error al guardar", "danger", "tc");
        }
    };

    const handleBorrarAlarma = async (id) => {
        try {
            await deleteAlzheimer(`${AlzheimerAlarm}/delete/${id}`, {});
            mutate(AlzheimerAlarm);
        } catch (error) {
            console.error("Error al borrar la alarma:", error);
            alert("Error al intentar borrar la alarma");
        }
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
        if (e.target.value) {
            setInvalid((prev) => ({ ...prev, title: false }));
        }
    };

    const handleChangeDate = (e) => {
        setDate(e.target.value);
        if (e.target.value) {
            setInvalid((prev) => ({ ...prev, date: false }));
        }
    };

    const handleChangeTime = (e) => {
        setTime(e.target.value);
        if (e.target.value) {
            setInvalid((prev) => ({ ...prev, time: false }));
        }
    };

    return (
        <div className="content">
            <Button onClick={toggleMostrarNuevoAlarma} style={{ marginBottom: "3vh" }}>Nueva alarma</Button>

            {mostrarNuevoAlarma ? (
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
                                                    onChange={handleChangeTitle}
                                                    invalid={invalid.title}
                                                />
                                                <FormFeedback>El título es obligatorio.</FormFeedback>
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
                                                    onChange={handleChangeDate}
                                                    invalid={invalid.date}
                                                />
                                                <FormFeedback>La fecha es obligatoria.</FormFeedback>
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
                                                    onChange={handleChangeTime}
                                                    invalid={invalid.time}
                                                />
                                                <FormFeedback>La hora es obligatoria.</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Notifications />
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
            ) : (
                <div className="table-full-width table-responsive">
                    <Table>
                        <tbody>
                            <h4>Alarmas</h4>
                            {alarm && alarm
                                .filter(alarma => alarma.patientId === data.dto?.patientId)
                                .map((alarma) => (
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
            )}
        </div>
    );
}

export default Alarmas;
