import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useIdleTimer from './useIdleTimer';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    const handleIdle = () => {
        handleLogout();
    };

    useIdleTimer(handleIdle, 600000); // 600000ms = 10 minutes

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

export const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('dto');
    window.location.href = '/login';
};
