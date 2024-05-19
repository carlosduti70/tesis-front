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
import { fetchAlzheimer, AlzheimerCard } from 'service/alzheimer';


function Interactions (){

    // llamar datos
    const { data: card } = useSWR(AlzheimerCard, fetchAlzheimer, {
        suspense: false,
    }); 

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
                    <th>Comportamiento</th>
                </tr>
                </thead>
                <tbody>
                {card && card.map((item, index) => (
                    <tr key={index}>
                    <td>{item.dateTime}</td>
                    <td>{item.hour}</td>
                    <td>{item.pregunta}</td>
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
