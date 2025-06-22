import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Atau spinner loading
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada allowedRoles, cek peran user
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Jika user tidak memiliki role yang diizinkan
    // Anda bisa mengarahkan ke halaman 403 Forbidden atau ke beranda
    return <Navigate to="/" replace />; // Arahkan ke beranda jika tidak diizinkan
  }

  return <Outlet />; // Render children routes
};

export default ProtectedRoute;