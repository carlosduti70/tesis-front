import { Card, CardBody, CardText, CardHeader, CardFooter, Button, Table, Input, Label, FormGroup } from "reactstrap";
import { fetchAlzheimer, AlzheimerReminders, AlzheimerAlarm } from "service/alzheimer";
import useSWR from 'swr';
import { useData } from 'contexts/DataContext';


function TotalActivos() {

  const { data: reminders, error: remindersError } = useSWR(AlzheimerReminders, fetchAlzheimer, {
    suspense: false,
  });
  const { data } = useData(); // Obtén los datos del contexto

  const { data: alarm, error: alarmError } = useSWR(AlzheimerAlarm, fetchAlzheimer, {
    suspense: false,
  });

  const totalReminders = reminders 
    ? reminders.filter(recordatorio => recordatorio.patientId === data.dto?.patientId)
    : [];

  const totalAlarms = alarm 
    ? alarm.filter(alarma => alarma.patientId === data.dto?.patientId)
    : [];

  return (
    <Card>
      <CardHeader>
        <h3 className="title d-inline">Recordatorios Activos</h3>
        <p className="card-category d-inline"></p>
      </CardHeader>  
      <CardBody>
      <div className="table-full-width table-responsive">
          <Table>
            <tbody>
                <tr>
                  <td>
                    <h4 className="title">Recordatorios</h4>
                    <h3>{totalReminders ? totalReminders.length : 0}</h3>
                  </td>
                  <td>
                    <h4 className="title">Alarmas</h4>
                    <h3>{totalAlarms ? totalAlarms.length : 0}</h3>
                  </td>
                </tr>
              
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}

export default TotalActivos;
