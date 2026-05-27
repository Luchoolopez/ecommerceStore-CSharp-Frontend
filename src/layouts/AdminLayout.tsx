import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      {/* Contenido principal */}
      <main className="flex-1 flex flex-col overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
