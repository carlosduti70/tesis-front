import React from "react";
import { Card, CardBody, CardText } from "reactstrap";
import calcularEdad from "./calcularEdad";
import { useData } from 'contexts/DataContext';

function UserProfileCard() {
  const { data } = useData();

  // Verifica si data.dto no es null antes de acceder a sus propiedades
  const patientName = data.dto?.patientName || "Usuario";
  const patientLastName = data.dto?.patientLastName || "";
  const dateDiagnosis = data.dto?.dateDiagnosis || "Fecha de diagnóstico";
  const address = data.dto?.address || "Dirección";
  const age = data.dto ? calcularEdad(data.dto.age) + " años" : "Edad";
  const stage = data.dto?.stage || "Inicial";

  return (
    <Card className="card-user">
      <CardBody>
        <CardText />
        <div className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />  
          <img
            alt="Avatar"
            className="avatar"
            src={"https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"}
          />

          <h1 className="title">{`${patientName} ${patientLastName}`}</h1>
          <p className="description">Fecha de diagnóstico: {dateDiagnosis}</p>
          <p className="description">Dirección: {address}</p>
          <p className="description">Edad: {age}</p>
          <p className="description">Etapa: {stage}</p>
        </div>
      </CardBody>
    </Card>
  );
}

export default UserProfileCard;
