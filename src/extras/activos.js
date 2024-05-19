import { Card, CardBody, CardText, CardHeader, CardFooter, Button, Table, Input, Label, FormGroup } from "reactstrap";
import { fetchAlzheimer, AlzheimerReminders, AlzheimerAlarm } from "service/alzheimer";
import useSWR from 'swr';
function TotalActivos() {

  const { data: reminders, error: remindersError } = useSWR(AlzheimerReminders, fetchAlzheimer, {
    suspense: false,
  });

  const { data: alarm, error: alarmError } = useSWR(AlzheimerAlarm, fetchAlzheimer, {
    suspense: false,
  });

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
                    <h3>{reminders ? reminders.length : 0}</h3>
                  </td>
                  <td>
                    <h4 className="title">Alarmas</h4>
                    <h3>{alarm ? alarm.length : 0}</h3>
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
