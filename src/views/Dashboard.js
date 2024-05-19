import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
} from "reactstrap";
import obtenerFechaActual from "extras/Date";
import Reloj from "extras/clock";
import ListaDeTareas from "extras/task";
import UserProfileCard from "extras/userInformation";
import TotalActivos from "extras/activos";
function Menu(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  const fechaActual = obtenerFechaActual();
  const horaActual = Reloj();

  return (
    <>
      <div className="content">
        <Row>
          {/* fecha y hora */}
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h1">
                  <i className="tim-icons icon-single-02" /> Bienvenido
                </CardTitle>
                <CardTitle tag="h3">{fechaActual}</CardTitle>
                <CardTitle tag="h1">{horaActual}</CardTitle>
              </CardHeader>
            </Card>

            {/* listado de las tareas */}
            <ListaDeTareas />
          </Col>

          {/* informacion del usuario */}
          <Col md="6">
            <UserProfileCard/>
            <TotalActivos/>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Menu;