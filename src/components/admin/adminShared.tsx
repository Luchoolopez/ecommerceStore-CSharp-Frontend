import { AlertCircle } from 'lucide-react';
import { Typography } from '../ui';
import { AdminModal } from './AdminModal';

// ─── AdminPageHeader ──────────────────────────────────────────────

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

/**
 * Encabezado estandarizado para todas las páginas del panel de admin.
 * Muestra breadcrumb, título y slot para acción principal (ej: botón "Nuevo").
 */
export const AdminPageHeader = ({ title, subtitle, action }: AdminPageHeaderProps) => (
  <div className="px-8 py-6 border-b border-outline flex items-center justify-between shrink-0">
    <div>
      <Typography variant="label-caps" className="text-outline">
        Panel de Administración
      </Typography>
      <Typography variant="headline-md" as="h1" className="text-primary uppercase">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body-md" className="text-outline mt-1">
          {subtitle}
        </Typography>
      )}
    </div>
    {action}
  </div>
);

// ─── AdminConfirmDelete ───────────────────────────────────────────

interface AdminConfirmDeleteProps {
  open: boolean;
  /** Nombre del recurso a eliminar para mostrarlo en el mensaje */
  resourceName: string;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * Modal de confirmación de eliminación reutilizable.
 * Siempre muestra el nombre del recurso para evitar borrados accidentales.
 */
export const AdminConfirmDelete = ({
  open,
  resourceName,
  loading,
  onCancel,
  onConfirm,
}: AdminConfirmDeleteProps) => (
  <AdminModal open={open} onClose={onCancel} title="Confirmar eliminación" maxWidth="max-w-md">
    <div className="flex items-start gap-3 border border-error/40 bg-error/5 p-4">
      <AlertCircle size={18} className="text-error shrink-0 mt-0.5" aria-hidden="true" />
      <Typography variant="body-md" className="text-on-surface">
        ¿Eliminar <strong>{resourceName}</strong>? Esta acción no se puede deshacer.
      </Typography>
    </div>
    <div className="flex gap-3 justify-end pt-2">
      <button
        onClick={onCancel}
        className="border border-outline text-on-surface font-hanken font-bold text-[12px] tracking-[0.1em] uppercase px-5 py-2.5 hover:border-primary transition-colors"
      >
        Cancelar
      </button>
      <button
        onClick={onConfirm}
        disabled={loading}
        className="bg-error text-on-error font-hanken font-bold text-[12px] tracking-[0.1em] uppercase px-5 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Eliminando...' : 'Eliminar'}
      </button>
    </div>
  </AdminModal>
);

// ─── Clases CSS compartidas ───────────────────────────────────────

/** Estilos base para inputs de texto del panel admin */
export const adminInputCls =
  'bg-transparent border border-outline focus:border-primary text-on-surface font-hanken text-[15px] px-3 py-2.5 outline-none transition-colors placeholder:text-outline/40 w-full';

/** Estilos base para selects del panel admin */
export const adminSelectCls =
  'bg-surface border border-outline focus:border-primary text-on-surface font-hanken text-[15px] px-3 py-2.5 outline-none transition-colors w-full';

/** Estilos para el botón de acción principal del admin (ej: "Guardar", "Crear") */
export const adminPrimaryBtnCls =
  'bg-primary text-on-primary font-hanken font-bold text-[12px] tracking-[0.1em] uppercase px-5 py-2.5 hover:bg-primary/90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed';

/** Estilos para el botón secundario del admin (ej: "Cancelar") */
export const adminSecondaryBtnCls =
  'border border-outline text-on-surface font-hanken font-bold text-[12px] tracking-[0.1em] uppercase px-5 py-2.5 hover:border-primary transition-colors';

/** Estilos de encabezado de tabla */
export const adminThCls =
  'px-4 py-3 text-left font-hanken font-bold text-[11px] tracking-[0.1em] uppercase text-outline whitespace-nowrap';

/** Estilos de celda de tabla */
export const adminTdCls = 'px-4 py-3';
