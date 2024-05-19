import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
} from 'reactstrap';
import useSWR from 'swr';
import { fetchAlzheimer, AlzheimerReminders } from 'service/alzheimer';



// // Función para obtener la cantidad de tareas
// const obtenerCantidadTareas = (data) => {
//   return data.content.length;
// };

const ListaDeTareas = () => {

  const { data: reminders, error: remindersError } = useSWR(AlzheimerReminders, fetchAlzheimer, {
    suspense: false,
  }); 

  return (
    <Card className="card-tasks">
      <CardHeader>
        <h6 className="title d-inline">Lista de recordatorios({reminders ? reminders.length : 0})</h6>
      </CardHeader>
      <CardBody>
        <div className="table-full-width table-responsive">
          <Table>
            <tbody>
              {reminders && reminders.map((tarea) => (
                <tr key={tarea.id}>
                  <td>
                    <p className="title">{tarea.title}</p>
                    <p className="text-muted">{tarea.description}</p>
                    <p className="text-muted">{tarea.date}</p>
                    <p className="text-muted">{tarea.time}</p>
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


// {reminders && reminders.content.map((tarea) => (

//   ))}