import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { Typography } from '../../components/ui';
import { AdminModal } from '../../components/admin/AdminModal';
import {
  AdminPageHeader,
  adminInputCls,
  adminSelectCls,
  adminPrimaryBtnCls,
  adminSecondaryBtnCls,
  adminThCls,
  adminTdCls,
} from '../../components/admin/adminShared';
import { adminPedidoService } from '../../services/admin.service';
import { extractErrorMessage } from '../../utils/api.helpers';
import type { PedidoResponseDto, EstadoPedido, UpdateOrderStatusDto } from '../../types/pedido.types';

// ─── Constantes de estado ─────────────────────────────────────────

/** Todos los estados posibles del backend (enum EstadoPedido) */
const ESTADOS_PEDIDO: EstadoPedido[] = [
  'pendiente',
  'confirmado',
  'armando',
  'enviado',
  'entregado',
  'cancelado',
];

const ESTADO_BADGE_CLS: Record<EstadoPedido, string> = {
  pendiente: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  confirmado: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  armando: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  enviado: 'text-indigo-400 border-indigo-400/30 bg-indigo-400/5',
  entregado: 'text-green-400 border-green-400/30 bg-green-400/5',
  cancelado: 'text-red-400 border-red-400/30 bg-red-400/5',
};

const EstadoBadge = ({ estado }: { estado: EstadoPedido }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 border font-hanken font-bold text-[11px] tracking-widest uppercase ${
      ESTADO_BADGE_CLS[estado]
    }`}
  >
    {estado}
  </span>
);

// ─── Buscar pedido por ID ─────────────────────────────────────────

/**
 * Panel de búsqueda por ID.
 * Nota: el backend no expone GET /pedido con lista paginada para admin.
 * Mientras se agrega ese endpoint, se buscan pedidos individuales por ID.
 */
const BuscadorPedido = ({
  onEncontrado,
}: {
  onEncontrado: (p: PedidoResponseDto) => void;
}) => {
  const [idInput, setIdInput] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState<string | null>(null);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(idInput, 10);
    if (isNaN(id) || id <= 0) {
      setErrorBusqueda('Ingresá un ID válido.');
      return;
    }
    try {
      setBuscando(true);
      setErrorBusqueda(null);
      const pedido = await adminPedidoService.getById(id);
      onEncontrado(pedido);
    } catch (err) {
      setErrorBusqueda(extractErrorMessage(err));
    } finally {
      setBuscando(false);
    }
  };

  return (
    <form onSubmit={handleBuscar} className="flex gap-3 items-start">
      <div className="flex flex-col gap-1">
        <label htmlFor="pedido-id" className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
          Buscar por ID de pedido
        </label>
        <div className="flex gap-2">
          <input
            id="pedido-id"
            type="number"
            min="1"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            placeholder="Ej: 42"
            className={`max-w-[140px] ${adminInputCls}`}
          />
          <button type="submit" disabled={buscando} className={adminPrimaryBtnCls}>
            {buscando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        {errorBusqueda && (
          <Typography variant="body-md" className="text-error mt-1" role="alert">
            {errorBusqueda}
          </Typography>
        )}
      </div>
    </form>
  );
};

// ─── Tarjeta de pedido encontrado ────────────────────────────────

const PedidoCard = ({
  pedido,
  onUpdateEstado,
}: {
  pedido: PedidoResponseDto;
  onUpdateEstado: (p: PedidoResponseDto) => void;
}) => (
  <div className="border border-outline flex flex-col">
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-outline">
      <div className="flex items-center gap-4">
        <Typography variant="label-caps" className="text-primary">
          #{pedido.numeroPedido ?? pedido.id}
        </Typography>
        <EstadoBadge estado={pedido.estado} />
      </div>
      <Typography variant="body-md" className="text-primary font-bold">
        ${pedido.total.toFixed(2)}
      </Typography>
    </div>

    {/* Metadata */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 border-b border-outline">
      {[
        ['Usuario', `#${pedido.usuarioId}`],
        ['Fecha', new Date(pedido.fecha).toLocaleDateString('es-AR')],
        ['Tracking', pedido.trackingNumber ?? '—'],
        ['Proveedor', pedido.shippingProvider ?? '—'],
      ].map(([k, v]) => (
        <div key={k} className="flex flex-col gap-0.5">
          <Typography variant="label-caps" className="text-outline">
            {k}
          </Typography>
          <Typography variant="body-md" className="text-on-surface">
            {v}
          </Typography>
        </div>
      ))}
    </div>

    {/* Items */}
    {pedido.detalles.length > 0 && (
      <div className="p-5 border-b border-outline">
        <Typography variant="label-caps" className="text-outline mb-3">
          Artículos
        </Typography>
        <div className="divide-y divide-outline border border-outline">
          {pedido.detalles.map((d, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-2.5">
              <Typography variant="body-md" className="text-on-surface">
                {d.nombreProducto ?? `Variante #${d.varianteId}`}
                {d.atributoVariante && (
                  <span className="text-outline ml-2">({d.atributoVariante})</span>
                )}
              </Typography>
              <Typography variant="label-caps" className="text-outline whitespace-nowrap">
                x{d.cantidad} — ${d.precioUnitario.toFixed(2)}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Acciones */}
    <div className="px-5 py-4 flex justify-end">
      <button
        onClick={() => onUpdateEstado(pedido)}
        className={adminPrimaryBtnCls}
      >
        Actualizar Estado
      </button>
    </div>
  </div>
);

// ─── Página principal ─────────────────────────────────────────────

export const AdminPedidos = () => {
  const [pedidosEncontrados, setPedidosEncontrados] = useState<PedidoResponseDto[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal de estado
  const [modalEstado, setModalEstado] = useState<PedidoResponseDto | null>(null);
  const [nuevoEstado, setNuevoEstado] = useState<EstadoPedido>('pendiente');
  const [tracking, setTracking] = useState('');

  const agregarPedido = useCallback((p: PedidoResponseDto) => {
    setPedidosEncontrados((prev) => {
      // Actualizar si ya existe, sino agregar al inicio
      const existe = prev.some((x) => x.id === p.id);
      return existe ? prev.map((x) => (x.id === p.id ? p : x)) : [p, ...prev];
    });
  }, []);

  const abrirModalEstado = (p: PedidoResponseDto) => {
    setNuevoEstado(p.estado);
    setTracking(p.trackingNumber ?? '');
    setError(null);
    setModalEstado(p);
  };

  const handleUpdateEstado = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEstado) return;

    const dto: UpdateOrderStatusDto = {
      estado: nuevoEstado,
      trackingNumber: tracking.trim() || undefined,
    };

    try {
      setSaving(true);
      setError(null);
      const actualizado = await adminPedidoService.updateStatus(modalEstado.id, dto);
      agregarPedido(actualizado);
      setModalEstado(null);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const quitarPedido = (id: number) => {
    setPedidosEncontrados((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col min-h-full">
      <AdminPageHeader
        title="Pedidos"
        subtitle="Buscá pedidos por ID para gestionarlos"
      />

      <div className="p-8 flex flex-col gap-8 flex-1">
        {/* Aviso de limitación del backend */}
        <div className="border border-outline/40 bg-surface-container p-4">
          <Typography variant="label-caps" className="text-outline">
            📌 Nota técnica
          </Typography>
          <Typography variant="body-md" className="text-outline mt-1">
            El backend aún no expone un endpoint de lista paginada de pedidos para admin.
            Buscá pedidos por ID hasta que se agregue{' '}
            <code className="font-hanken text-primary">GET /api/pedido?page=1&limit=50</code>.
          </Typography>
        </div>

        <BuscadorPedido onEncontrado={agregarPedido} />

        {/* Lista de pedidos encontrados */}
        {pedidosEncontrados.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-outline pb-3">
              <Typography variant="label-caps" className="text-outline">
                {pedidosEncontrados.length} pedido{pedidosEncontrados.length !== 1 ? 's' : ''} encontrado{pedidosEncontrados.length !== 1 ? 's' : ''}
              </Typography>
              <button
                onClick={() => setPedidosEncontrados([])}
                className="flex items-center gap-1 font-hanken font-bold text-[11px] tracking-wide uppercase text-outline hover:text-error transition-colors"
              >
                <X size={12} aria-hidden="true" /> Limpiar
              </button>
            </div>
            {pedidosEncontrados.map((p) => (
              <PedidoCard key={p.id} pedido={p} onUpdateEstado={abrirModalEstado} />
            ))}
          </div>
        )}
      </div>

      {/* Modal Actualizar Estado */}
      <AdminModal
        open={!!modalEstado}
        onClose={() => setModalEstado(null)}
        title={`Estado — Pedido #${modalEstado?.numeroPedido ?? modalEstado?.id ?? ''}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleUpdateEstado} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="pedido-estado" className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
              Nuevo Estado
            </label>
            <select
              id="pedido-estado"
              required
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value as EstadoPedido)}
              className={adminSelectCls}
            >
              {ESTADOS_PEDIDO.map((e) => (
                <option key={e} value={e}>
                  {e.charAt(0).toUpperCase() + e.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="pedido-tracking" className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
              Tracking{' '}
              <span className="text-outline/50 normal-case font-normal">(opcional)</span>
            </label>
            <input
              id="pedido-tracking"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className={adminInputCls}
              placeholder="RA123456789AR"
            />
          </div>

          {error && (
            <Typography variant="body-md" className="text-error" role="alert">
              {error}
            </Typography>
          )}

          <div className="flex gap-3 justify-end pt-2 border-t border-outline">
            <button type="button" onClick={() => setModalEstado(null)} className={adminSecondaryBtnCls}>
              Cancelar
            </button>
            <button type="submit" disabled={saving} className={adminPrimaryBtnCls}>
              {saving ? 'Guardando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
