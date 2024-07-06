// import React, { useState } from 'react';
// import { Button, Card, CardHeader, CardBody, Form, FormGroup, Input, Row, Col, Table } from "reactstrap";
// import useSWR, { mutate } from 'swr';
// import { fetchAlzheimer, createAlzheimer, deleteAlzheimer, AlzheimerCaragivers } from 'service/alzheimer';


// function RegistroCaragivers() {
//   const [mostrarNuevocaragivers, setMostrarNuevocaragivers] = useState(false);
//   const [name, setName] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [parentezco, setParentezco] = useState("");

//   const toggleMostrarNuevocaragivers = () => {
//     setMostrarNuevocaragivers(!mostrarNuevocaragivers);
//   };

//   const handleEtapaChange = (event) => {
//     setParentezco(event.target.value);
//   };

//   const handleGuardarCuidadores = () => {
//     if (!name || !lastname || !username || !email || !parentezco) {
//       alert("Todos los campos son obligatorios!!");
//       return;
//   }
//     const cuidador = {
//       name: name,
//       lastName: lastname,
//       userName: username,
//       gmail: email,
//       relationship: parentezco
//     };

//     createAlzheimer(AlzheimerCaragivers, { arg: cuidador })
//       .then(response => {
//         console.log('Cuidador guardado:', response);
//         alert("Guardado!!");
//       })
//       .catch(error => {
//         console.error('Error al guardar el cuidador:', error);
//         alert("Error al guardar");
//       });
//   };

//   const { data: caragivers, error: caragiversError } = useSWR(AlzheimerCaragivers, fetchAlzheimer, {
//     suspense: false,
//   });

//   const handleBorrarCaragivers = async (id) => {
//     try {
//       await deleteAlzheimer(`${AlzheimerCaragivers}/delete/${id}`, {});
//       alert("Se ha borrado con éxito!!");
//       mutate(AlzheimerCaragivers);
//     } catch (error) {
//       console.error("Error al borrar el caragivers:", error);
//       alert("Error al intentar borrar caragivers");
//     }
//   };

//   return (
//     <>
//       <div className="content">
//         <h1>Cuidadores</h1>
//         <Button onClick={toggleMostrarNuevocaragivers}>Nuevo cuidador</Button>

//         {mostrarNuevocaragivers && (
//           <Card>
//             <CardHeader>
//               <h5 className="title">Registro de Cuidador</h5>
//             </CardHeader>
//             <CardBody>
//               <Form>
//                 <Row>
//                   <Col className="pr-md-1" md="5">
//                     <FormGroup>
//                       <label>Nombre</label>
//                       <Input
//                         id='name'
//                         placeholder="Name"
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col className="px-md-1" md="3">
//                     <FormGroup>
//                       <label>Apellido</label>
//                       <Input
//                         id='lastname'
//                         placeholder="Lastname"
//                         type="text"
//                         value={lastname}
//                         onChange={(e) => setLastname(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col className="pl-md-1" md="4">
//                     <FormGroup>
//                       <label>Nombre de cuidador</label>
//                       <Input
//                         id='username'
//                         defaultValue="User 1"
//                         placeholder="UserName"
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col className="pr-md-1" md="6">
//                     <FormGroup>
//                       <label>Correo Electrónico</label>
//                       <Input
//                         id='email'
//                         placeholder="example@gmail.com"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col className="pl-md-1" md="6">
//                     <FormGroup>
//                       <label>Parentezco con el paciente</label>
//                       <Input
//                         type="select"
//                         name="parentezco"
//                         id="parentezco"
//                         value={parentezco}
//                         onChange={handleEtapaChange}>
//                         <option value="Paciente">Paciente</option>
//                         <option value="Familia">Familiar</option>
//                         <option value="Cuidador">Cuidador</option>
//                       </Input>
//                     </FormGroup>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col md="8">
//                     <Button color="primary" onClick={handleGuardarCuidadores}>
//                       Guardar
//                     </Button>
//                     <Button className="btn-fill" onClick={toggleMostrarNuevocaragivers}>
//                       Cancelar
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             </CardBody>
//           </Card>
//         )}
//         <div className="table-full-width table-responsive">
//           <Table>
//             <tbody>
//               {caragivers && caragivers.map((caragiver) => (
//                 <tr key={caragiver.id}>
//                   <td>
//                     <p className="title">{`${caragiver.name} ${caragiver.lastName}`}</p>
//                     <p className="text-muted">{caragiver.gmail}</p>
//                   </td>
//                   <td>
//                     <Button onClick={() => handleBorrarCaragivers(caragiver.id)}><i className="tim-icons icon-trash-simple" /></Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </>
//   )
// }

// export default RegistroCaragivers;
