import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import RegistroPaciente from "layouts/RegistroPaciente/RegistroPaciente";
import RegistroUsuario from "layouts/RegistroUsuario/RegistroUsuario";
import IniciarSesion from "layouts/IniciarSesion/IniciarSesion";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/patientrecord/*" element={<RegistroPaciente />} />
          <Route path="/userregister/*" element={<RegistroUsuario />} />
          <Route path="/rtl/*" element={<RTLLayout />} />
          <Route path="/login/*" element={<IniciarSesion />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
