import { Typography } from '../../components/ui';
import { useAuthContext } from '../../context/authContext';
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.FC<{ size?: number; strokeWidth?: number }>;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, description }) => (
  <div className="border border-outline p-6 flex flex-col gap-4 hover:border-primary transition-colors">
    <div className="flex items-start justify-between">
      <Typography variant="label-caps" className="text-outline">{label}</Typography>
      <Icon size={20} strokeWidth={1.5} />
    </div>
    <Typography variant="headline-lg" as="span" className="text-primary leading-none text-[40px]">
      {value}
    </Typography>
    <Typography variant="body-md" className="text-outline">{description}</Typography>
  </div>
);

export const AdminDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-outline flex items-center justify-between">
        <div>
          <Typography variant="label-caps" className="text-outline">Panel de Administración</Typography>
          <Typography variant="headline-md" as="h1" className="text-primary uppercase">
            Dashboard
          </Typography>
        </div>
        <Typography variant="body-md" className="text-outline">
          Bienvenido, <span className="text-on-surface font-bold">{user?.nombre}</span>
        </Typography>
      </div>

      {/* Contenido */}
      <div className="p-8 flex flex-col gap-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-outline border border-outline">
          <StatCard
            label="Productos"
            value="—"
            icon={Package}
            description="Total en catálogo"
          />
          <StatCard
            label="Pedidos"
            value="—"
            icon={ShoppingBag}
            description="Total recibidos"
          />
          <StatCard
            label="Usuarios"
            value="—"
            icon={Users}
            description="Registrados"
          />
          <StatCard
            label="Ventas"
            value="—"
            icon={TrendingUp}
            description="Este mes"
          />
        </div>

        {/* Acceso rápido */}
        <div>
          <div className="border-b border-outline pb-4 mb-6">
            <Typography variant="headline-md" as="h2" className="text-primary uppercase">
              Acceso Rápido
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline border border-outline">
            {[
              { label: 'Nuevo Producto', href: '/admin/productos/nuevo', desc: 'Agregar un producto al catálogo' },
              { label: 'Ver Pedidos', href: '/admin/pedidos', desc: 'Gestionar pedidos pendientes' },
              { label: 'Ver Usuarios', href: '/admin/usuarios', desc: 'Administrar usuarios registrados' },
            ].map(({ label, href, desc }) => (
              <a
                key={href}
                href={href}
                className="bg-surface p-6 flex flex-col gap-2 hover:bg-surface-container group transition-colors"
              >
                <Typography variant="label-caps" className="text-primary group-hover:underline">
                  {label}
                </Typography>
                <Typography variant="body-md" className="text-outline">{desc}</Typography>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
