import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({ token: null, claims: null, dto: null });

    const getToken = () => localStorage.getItem('token');

    const getClaimsFromToken = (token) => {
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

    const fetchDTO = async (claims, token) => {
        // Suponiendo que tengas una función para llamar a tu backend y obtener el DTO
        try {
            const response = await fetch(`http://localhost:8081/patient/get-home/${claims.sub}`);
            const dto = await response.json();
            console.log('DTO fetched from backend:', dto);
            localStorage.setItem('dto', JSON.stringify(dto)); // Guarda el DTO en localStorage
            setData({ token, claims, dto });
        } catch (error) {
            console.error('Error fetching DTO:', error);
        }
    };

    const getDTOFromLocalStorage = () => {
        const dto = localStorage.getItem('dto');
        return dto ? JSON.parse(dto) : null;
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            const claims = getClaimsFromToken(token);
            if (claims) {
                const storedDTO = getDTOFromLocalStorage();
                if (storedDTO) {
                    setData({ token, claims, dto: storedDTO });
                } else {
                    fetchDTO(claims, token);
                }
            }
        }
    }, []);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
