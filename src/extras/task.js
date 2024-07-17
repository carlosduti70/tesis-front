import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
} from 'reactstrap';
import useSWR from 'swr';
import { fetchAlzheimer, AlzheimerReminders } from 'service/alzheimer';
import { useData } from 'contexts/DataContext';

const ListaDeTareas = () => {

  const { data: reminders, error: remindersError } = useSWR(AlzheimerReminders, fetchAlzheimer, {
    suspense: false,
  }); 
  const { data } = useData(); // Obtener los datos del contexto

  // Obtener los primeros 5 recordatorios que coincidan con el patientId
  const totalReminders = reminders 
    ? reminders.filter(recordatorio => recordatorio.patientId === data.dto?.patientId)
    : [];

    const filteredReminders = reminders 
    ? reminders.filter(recordatorio => recordatorio.patientId === data.dto?.patientId).slice(0, 3) 
    : [];

  return (
    <Card className="card-tasks">
      <CardHeader>
        <h6 className="title d-inline">Lista de recordatorios ({totalReminders.length})</h6>
      </CardHeader>
      <CardBody>
        <div className="table-full-width table-responsive">
          <Table>
            <tbody>
              <h4>Recordatorios Activos</h4>
              {filteredReminders.map((recordatorio) => (
                <tr key={recordatorio.id}>
                  <td>
                    <p className="title">{recordatorio.title}</p>
                    <p className="text-muted">{recordatorio.description}</p>
                    <p className="text-muted">{recordatorio.date}</p>
                    <p className="text-muted">{`${recordatorio.startTime} -- ${recordatorio.endTime}`}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ListaDeTareas;
