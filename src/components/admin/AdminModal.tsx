import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Typography } from '../ui';

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Ancho máximo del modal. Por defecto: max-w-xl */
  maxWidth?: 'max-w-sm' | 'max-w-md' | 'max-w-xl' | 'max-w-2xl';
  children: ReactNode;
}

/**
 * Modal accesible para el panel de administración.
 *
 * Cumple:
 * - aria-modal="true" y role="dialog" para lectores de pantalla
 * - Focus trap: el primer elemento enfocable recibe foco al abrir
 * - Cierre con tecla Escape
 * - Cierre al hacer click en el backdrop
 * - Scroll bloqueado en body mientras está abierto
 */
export const AdminModal = ({ open, onClose, title, maxWidth = 'max-w-xl', children }: AdminModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap + scroll lock
  useEffect(() => {
    if (!open) return;

    // Bloquear scroll del body
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Enfocar el primer elemento interactivo del panel
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    // Cerrar con Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`relative z-10 bg-surface border border-outline w-full ${maxWidth} max-h-[90vh] overflow-y-auto flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline shrink-0">
          <Typography
            id="admin-modal-title"
            variant="label-caps"
            className="text-primary uppercase"
          >
            {title}
          </Typography>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="text-outline hover:text-primary transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
};
