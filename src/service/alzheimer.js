import axios from "axios";

// Obtener el token del localStorage
export const getToken = () => localStorage.getItem('token');

export const baseUrl = 'https://tesis-back-production-e850.up.railway.app';

// Define las URL base
export const AlzheimerAlarm = `${baseUrl}/alarm`;
export const AlzheimerCaragivers = `${baseUrl}/auth/register`;
export const AlzheimerCard = `${baseUrl}/card`;
export const AlzheimerConfigurations = `${baseUrl}/configurations`;
export const AlzheimerInteractions = `${baseUrl}/interactions`;
export const AlzheimerPatient = `${baseUrl}/patient`;
export const AlzheimerReminders = `${baseUrl}/reminders`;
export const AlzheimerCardName = `${baseUrl}/cardName`;
export const AlzheimerRemindersPast = `${baseUrl}/reminders/card-reminders`;
export const AlzheimerCards = `${baseUrl}/card`;

export const patientAlzheimer = async (url, arg) => {
    const response = await axios.post(url, arg);
    return response.data;
};

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
        const response = await axios.post(`${baseUrl}/auth/login`, {
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
