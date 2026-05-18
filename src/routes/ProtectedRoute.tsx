import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  let user = null;

  try {
    if (userStr) {
      user = JSON.parse(userStr);
    }
  } catch (e) {
    console.error('Error parsing user from localStorage', e);
  }

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirigir al inicio
  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderizar las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;
