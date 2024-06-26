import { Card, CardBody, CardText, CardFooter, Button } from "reactstrap";
import { fetchAlzheimer, AlzheimerPatient } from "service/alzheimer";
import useSWR from "swr";
import calcularEdad from "./calcularEdad";

function UserProfileCard() {

  const { data: patient, error: patientError } = useSWR(AlzheimerPatient, fetchAlzheimer, { 
    suspense: false,
  }); 


  return (
    <Card className="card-user">
        {patient && patient.content.map((patient) => (
      <CardBody>
        <CardText />
        <div className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />  
          <img
    alt="..."
    className="avatar"
    src={"https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"}
/>

            <h1 className="title">{`${patient.name} ${patient.lastName}` || "Usuario"}</h1>
          <p className="description">Fecha de diagnostico: {patient?.dateDiagnosis || "fecha diagnóstico"}</p>
          <p className="description">Dirección: {patient?.address || "Dirección"}</p>
          <p className="description">Edad: {calcularEdad(patient?.age) + " Años"}</p>
          <p className="description">Etapa: {patient?.stage || "inicial"}</p>

        </div>
        {/* <div className="card-description">{patient?.content?.dateDiagnosis}</div> */}
      </CardBody>
          ))}
      {/* <CardFooter>
        <h4>Contacto Familiar</h4>
        <div className="button-container">
          <Button className="btn-icon btn-round" color="facebook">
            <i className="fab fa-facebook" />
          </Button>
          <Button className="btn-icon btn-round" color="twitter">
            <i className="fab fa-twitter" />
          </Button>
          <Button className="btn-icon btn-round" color="google">
            <i className="fab fa-google-plus" />
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  );
}

export default UserProfileCard;
