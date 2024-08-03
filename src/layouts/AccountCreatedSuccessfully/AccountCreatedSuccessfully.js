import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        setTimeout(() => {
            navigate('/login');
        }, 800);
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <Col md="6" lg="6" className="text-center">
                    <h1 className="mb-4" >BIENVENIDO!!</h1>
                    <h3 className="mb-4">A continuación en la pantalla principal ingresa el usuario y contraseña que acabas de crear.</h3>
                    <Button color="primary" onClick={handleButtonClick}>
                        Aceptar
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Success;
