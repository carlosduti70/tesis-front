import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";
import useSWR from 'swr';
import { fetchAlzheimer, AlzheimerInteractions } from 'service/alzheimer';
import { useData } from 'contexts/DataContext';

function Interactions (){

    // llamar datos
    const { data: iteractions } = useSWR(AlzheimerInteractions, fetchAlzheimer, {
        suspense: false,
    });
    const { data } = useData(); // Obtener los datos del contexto

    return (
        <div className="content">
        <Row>
            <Col>
            <Card>
            <CardHeader>
            <CardTitle tag="h4">Sensores</CardTitle>
            </CardHeader>
            <CardBody>
            <Table className="tablesorter" responsive>
                <thead className="text-primary">
                <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Recordatorio</th>
                </tr>
                </thead>
                <tbody>
                    {iteractions && iteractions.filter(iteraccion => iteraccion.patientId === data.dto?.patientId).map((iteraccion) => (
                        <tr key={iteraccion.id}>
                            <td>
                                <p className="title">{iteraccion.dateTime}</p>
                            </td>
                            <td>
                                <p className="text-muted">{iteraccion.hour}</p>
                            </td>
                            <td>
                                <p className="text-muted">{iteraccion.title}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </CardBody>
        </Card>
            </Col>
        </Row>
        </div>
    )
}

export default Interactions
