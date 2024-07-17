import { jwtDecode } from 'jwt-decode';

export const getToken = () => localStorage.getItem('token');

export const getClaimsFromToken = () => {
    const token = getToken();
    if (token) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
    return null;
};

export const getUsernameFromToken = () => {
    const claims = getClaimsFromToken();
    return claims ? claims.username : null; // Ajusta 'username' según el nombre del campo que necesitas
};
