// Login.js
import React, { useState } from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";

const SingIn = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación real
    // Por ahora, simplemente establece isLoggedIn como true
    setIsLoggedIn(true);
  };

  return (
    <div className="content">

    <Card>
      <CardHeader>
        <h5 className="title">Iniciar Sesión</h5>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup>
            <Label for="username">Usuario</Label>
            <Input
              type="text"
              id="username"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </FormGroup>
          <FormGroup>
            <Label for="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </FormGroup>
          <Button color="primary" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </Form>
      </CardBody>
    </Card>
    </div>
  );
};

export default SingIn;
