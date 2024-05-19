import React from 'react';

const obtenerFechaActual = () => {
    const fecha = new Date();
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString(undefined, opcionesFecha);
  };

  export default obtenerFechaActual