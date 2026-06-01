import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Typography } from '../ui';

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: 'max-w-sm' | 'max-w-md' | 'max-w-xl' | 'max-w-2xl';
  children: ReactNode;
}
export const AdminModal = ({ open, onClose, title, maxWidth = 'max-w-xl', children }: AdminModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Focus trap + scroll lock
  useEffect(() => {
    if (!open) return;

    // Bloquear scroll del body
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Enfocar el primer elemento preferido (input/select/textarea), si no existe, el primero disponible
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(focusable ?? []);
    const preferred = list.find((el) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName));
    (preferred ?? list[0])?.focus();

    // Cerrar con Escape 
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div
        className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`relative z-10 bg-surface border border-outline w-full ${maxWidth} max-h-[90vh] overflow-y-auto flex flex-col`}
      >
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

        <div className="p-6 flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
};
