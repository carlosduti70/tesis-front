import axios from "axios";

export const AlzheimerAlarm = 'http://localhost:8081/alarm'
export const AlzheimerCaragivers = 'http://localhost:8081/caragivers'
export const AlzheimerCard = 'http://localhost:8081/card'
export const AlzheimerConfigurations = 'http://localhost:8081/configurations'
export const AlzheimerInteractions = 'http://localhost:8081/interactions'
export const AlzheimerPatient = 'http://localhost:8081/patient'
export const AlzheimerReminders = 'http://localhost:8081/reminders'

export const fetchAlzheimer = 
async (url) => {
    const response = await axios.get(url);
    return response.data;
};

export const createAlzheimer = async (url, { arg }) => {
    const response = await axios.post(url, arg);
    return response.data;
};

export const updateAlzheimer = async (url, { arg }) => {
    const response = await axios.patch(url, arg);
    return response.data;
};
export const deleteAlzheimer = async (url) => {
    const response = await axios.delete(url);
    return response.data;
};