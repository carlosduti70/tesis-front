import axios from "axios";

// Obtener el token del localStorage
export const getToken = () => localStorage.getItem('token');

// Define las URL base
export const AlzheimerAlarm = 'http://localhost:8081/alarm';
export const AlzheimerCaragivers = 'http://localhost:8081/caragivers';
export const AlzheimerCard = 'http://localhost:8081/card';
export const AlzheimerConfigurations = 'http://localhost:8081/configurations';
export const AlzheimerInteractions = 'http://localhost:8081/interactions';
export const AlzheimerPatient = 'http://localhost:8081/patient';
export const AlzheimerReminders = 'http://localhost:8081/reminders';
export const AlzheimerCardName = 'http://localhost:8081/cardName';
export const AlzheimerRemindersPast = 'http://localhost:8081/reminders/card-reminders';

// Función para realizar solicitudes GET con autorización
export const fetchAlzheimer = async (url) => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(url, config);
    return response.data;
};


export const patientAlzheimer = async (url, arg) => {
    const response = await axios.post(url, arg);
    return response.data;
};


// Función para realizar solicitudes POST con autorización
export const createAlzheimer = async (url, arg) => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(url, arg, config);
    return response.data;
};

// Función para realizar solicitudes PATCH con autorización
export const updateAlzheimer = async (url, arg) => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.patch(url, arg, config);
    return response.data;
};

// Función para realizar solicitudes DELETE con autorización
export const deleteAlzheimer = async (url) => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(url, config);
    return response.data;
};

// Función de autenticación
export const authenticate = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8081/auth/login', {
            username: username,
            password: password
        });
        const token = response.data.jwt; 
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        console.error('Error de autenticación:', error);
        throw error; 
    }
};
