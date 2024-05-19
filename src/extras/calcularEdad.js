const obtenerlaFechaActual = () => {
    return new Date();
    };
    
    function calcularEdad(fechaNacimientoString) {
        const fechaNacimiento = new Date(fechaNacimientoString);
        const fechaActual = obtenerlaFechaActual(); // Usamos la función obtenerFechaActual para obtener la fecha actual
        let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        const mesActual = fechaActual.getMonth();
        const mesNacimiento = fechaNacimiento.getMonth();
    
        if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
    
        return edad;
    }

export default calcularEdad;