import React, { useState, useEffect } from 'react';

const Reloj = () => {
  const [horaActual, setHoraActual] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHoraActual(new Date());
    }, 1000); // Actualizar cada segundo

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  }, []);

  const obtenerFormatoHora = () => {
    const opcionesHora = { hour: 'numeric', minute: '2-digit', second: '2-digit' };
    return horaActual.toLocaleTimeString(undefined, opcionesHora);
  };

  return (
    <div>
      <p>{obtenerFormatoHora()}</p>
    </div>
  );
};

export default Reloj;
