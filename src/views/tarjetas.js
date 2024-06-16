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
import { fetchAlzheimer, AlzheimerCardName } from 'service/alzheimer';


function Cardsname (){

    // llamar datos
    const { data: cardname } = useSWR(AlzheimerCardName, fetchAlzheimer, {
        suspense: false,
    }); 

    return (
        <div className="content">
        <Row>
            <Col>
            <Card>
            <CardHeader>
            <CardTitle tag="h4">Tarjetas</CardTitle>
            </CardHeader>
            <CardBody>
            <Table className="tablesorter" responsive>
                <thead className="text-primary">
                <tr>
                    <th>Tarjeta</th>
                    <th>Identificación</th>
                    <th>Paciente</th>
                </tr>
                </thead>
                <tbody>
                {cardname && cardname.map((item, index) => (
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

export default Cardsname
