import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Shop } from '../pages/Shop';
import { ProductoDetalle } from '../pages/ProductoDetalle';
import { AuthPage } from '../pages/AuthPage';
import { AdminRouter } from './adminRouter';
import { ProtectedRoute } from './ProtectedRoute';

// Redirige a /admin si ya está logueado como admin, a / si está logueado como cliente
const PublicOnlyRoute = () => {
  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user');
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user?.rol === 'admin') return <Navigate to="/admin" replace />;
      return <Navigate to="/" replace />;
    } catch {
      /* token corrupto, mostrar login */
    }
  }
  return <AuthPage />;
};

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Shop />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} />
      <Route path="/login" element={<PublicOnlyRoute />} />

      {/* Panel de administración — solo para rol "admin" */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin/*" element={<AdminRouter />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
