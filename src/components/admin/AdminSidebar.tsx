import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, ShoppingBag, Users, LogOut, ChevronRight } from 'lucide-react';
import { Typography } from '../../components/ui';
import { useAuthContext } from '../../context/authContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/productos', label: 'Productos', icon: Package },
  { to: '/admin/categorias', label: 'Categorías', icon: Tag },
  { to: '/admin/pedidos', label: 'Pedidos', icon: ShoppingBag },
  { to: '/admin/usuarios', label: 'Usuarios', icon: Users },
];

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="flex flex-col h-full bg-surface-container-low border-r border-outline w-64 min-h-screen shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-outline">
        <Link to="/">
          <Typography variant="headline-md" className="text-primary uppercase tracking-tighter">
            FLOYD
          </Typography>
        </Link>
        <Typography variant="label-caps" className="text-outline mt-1">
          Panel de Admin
        </Typography>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 font-hanken text-[13px] font-bold tracking-[0.08em] uppercase transition-colors group ${
                isActive
                  ? 'bg-primary text-on-primary'
                  : 'text-outline hover:text-on-surface hover:bg-surface-container'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="flex-1">{label}</span>
                <ChevronRight size={14} className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'}`} />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Usuario activo */}
      <div className="border-t border-outline p-4">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center shrink-0">
            <span className="text-on-primary font-hanken font-bold text-[13px]">
              {user?.nombre?.charAt(0).toUpperCase() ?? 'A'}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <Typography variant="label-caps" className="text-on-surface truncate">
              {user?.nombre}
            </Typography>
            <Typography variant="label-caps" className="text-outline truncate text-[10px]">
              {user?.email}
            </Typography>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-outline hover:text-error hover:bg-error/10 transition-colors font-hanken text-[12px] font-bold tracking-[0.08em] uppercase"
        >
          <LogOut size={14} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};
