import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Shop } from '../pages/Shop';
import { ProductoDetalle } from '../pages/ProductoDetalle';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { AdminRouter } from './adminRouter';
import { ProtectedRoute } from './ProtectedRoute';

export const PublicOnlyRoute = () => {
  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user');

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      // Si está logueado, lo mandamos a su panel o al home
      if (user?.rol === 'admin') return <Navigate to="/admin" replace />;
      return <Navigate to="/" replace />;
    } catch {
      // Token corrupto, limpiarlo idealmente y dejarlo pasar al login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  }

  // Si no está logueado, lo dejamos pasar a la ruta pública (ej: Login)
  return <Outlet />;
};

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Shop />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Panel de administración — solo para rol "admin" */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin/*" element={<AdminRouter />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
