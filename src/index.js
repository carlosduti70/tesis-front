import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import RegistroPaciente from "layouts/RegistroPaciente/RegistroPaciente";
import RegistroUsuario from "layouts/RegistroUsuario/RegistroUsuario";
import IniciarSesion from "layouts/IniciarSesion/IniciarSesion";
import User from "layouts/User/User";
import PrivateRoute from "service/security";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { DataProvider } from "contexts/DataContext";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
    <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/patientrecord/*" element={<RegistroPaciente />} />
            <Route path="/userregister/*" element={<RegistroUsuario />} />
            <Route path="/rtl/*" element={<RTLLayout />} />
            <Route path="/login/*" element={<IniciarSesion />} />
            <Route path="/userinformations/*" element={<User />} />
            <Route path="/admin/*" element={<PrivateRoute />}>
              <Route path="*" element={<AdminLayout />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);

// http://localhost:3000/admin/alarma