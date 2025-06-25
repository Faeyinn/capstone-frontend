import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminRoute() {
    const { isAuthenticated, userRole } = useAuth();
    return isAuthenticated && userRole === 'admin' ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
}

export default AdminRoute;