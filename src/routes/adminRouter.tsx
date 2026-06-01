import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminProductos } from '../pages/admin/AdminProductos';
import { AdminCategorias } from '../pages/admin/AdminCategorias';
import { AdminPedidos } from '../pages/admin/AdminPedidos';
import { AdminUsuarios } from '../pages/admin/AdminUsuarios';

export const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="categorias" element={<AdminCategorias />} />
        <Route path="pedidos" element={<AdminPedidos />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
      </Route>
    </Routes>
  );
};
