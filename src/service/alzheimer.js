import axios from "axios";

export const AlzheimerAlarm = 'http://localhost:8081/alarm'
export const AlzheimerCaragivers = 'http://localhost:8081/caragivers'
export const AlzheimerCard = 'http://localhost:8081/card'
export const AlzheimerConfigurations = 'http://localhost:8081/configurations'
export const AlzheimerInteractions = 'http://localhost:8081/interactions'
export const AlzheimerPatient = 'http://localhost:8081/patient'
export const AlzheimerReminders = 'http://localhost:8081/reminders'
export const AlzheimerCardName = 'http://localhost:8081/cardName'
export const AlzheimerRemindersPast = 'http://localhost:8081/reminders/card-reminders'

// Obtener el token del localStorage
const getToken = () => localStorage.getItem('token');


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

export const authenticate = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8081/auth/login', {
            username: username,
            password: password
        });
        const token = response.data.jwt; // Obtener el token de la respuesta
        // Guardar el token en el almacenamiento local
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        // Manejar errores de autenticación, como credenciales incorrectas
        console.error('Error de autenticación:', error);
        throw error; // Puedes relanzar el error para que sea manejado en la parte que llama a este método
    }
};