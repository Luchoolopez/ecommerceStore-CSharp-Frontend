import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';

// Placeholder para secciones futuras
const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col flex-1">
    <div className="px-8 py-6 border-b border-outline">
      <span className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">Panel de Administración</span>
      <h1 className="font-anton text-[40px] text-primary uppercase">{title}</h1>
    </div>
    <div className="flex-1 flex items-center justify-center">
      <span className="font-hanken font-bold text-[12px] tracking-[0.15em] uppercase text-outline">
        Próximamente
      </span>
    </div>
  </div>
);

export const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="productos" element={<ComingSoon title="Productos" />} />
        <Route path="productos/nuevo" element={<ComingSoon title="Nuevo Producto" />} />
        <Route path="categorias" element={<ComingSoon title="Categorías" />} />
        <Route path="pedidos" element={<ComingSoon title="Pedidos" />} />
        <Route path="usuarios" element={<ComingSoon title="Usuarios" />} />
      </Route>
    </Routes>
  );
};
