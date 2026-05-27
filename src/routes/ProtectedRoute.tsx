import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user');
  let user: { rol?: string } | null = null;

  try {
    if (userStr) user = JSON.parse(userStr);
  } catch {
    // token corrupto — forzar login
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
