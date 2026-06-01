import { useEffect, useState, useCallback } from 'react';
import { Pencil, Trash2, Check } from 'lucide-react';
import { Typography } from '../../components/ui';
import { AdminModal } from '../../components/admin/AdminModal';
import {
  AdminPageHeader,
  AdminConfirmDelete,
  adminInputCls,
  adminPrimaryBtnCls,
  adminSecondaryBtnCls,
  adminThCls,
  adminTdCls,
} from '../../components/admin/adminShared';
import { adminUsuarioService } from '../../services/admin.service';
import { extractErrorMessage } from '../../utils/api.helpers';
import type { UsuarioResponseDto, RolUsuario, UpdateUsuarioDto } from '../../types/usuario.types';


const ROL_BADGE_CLS: Record<RolUsuario, string> = {
  admin: 'text-primary border-primary',
  usuario: 'text-outline border-outline',
};

/** Los admins no pueden ser eliminados desde el panel */
const ROLES_PROTEGIDOS: RolUsuario[] = ['admin'];

// ─── Página principal ─────────────────────────────────────────────

export const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuarioResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Estados de modales
  const [modalEdit, setModalEdit] = useState<UsuarioResponseDto | null>(null);
  const [modalDelete, setModalDelete] = useState<UsuarioResponseDto | null>(null);

  // Campos del formulario de edición
  const [editNombre, setEditNombre] = useState('');
  const [editTelefono, setEditTelefono] = useState('');
  const [editActivo, setEditActivo] = useState(true);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setUsuarios(await adminUsuarioService.getAll());
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const openEdit = (u: UsuarioResponseDto) => {
    setEditNombre(u.nombre);
    setEditTelefono(u.telefono ?? '');
    setEditActivo(u.activo);
    setError(null);
    setModalEdit(u);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEdit) return;

    // Validación mínima de nombre
    if (editNombre.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.');
      return;
    }

    const dto: UpdateUsuarioDto = {
      nombre: editNombre.trim(),
      telefono: editTelefono.trim() || undefined,
      activo: editActivo,
    };

    try {
      setSaving(true);
      setError(null);
      await adminUsuarioService.update(modalEdit.id, dto);
      setModalEdit(null);
      await cargar();
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!modalDelete) return;
    try {
      setSaving(true);
      await adminUsuarioService.delete(modalDelete.id);
      setModalDelete(null);
      await cargar();
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  // Filtrado defensivo (guarda contra nombre/email undefined)
  const filtered = usuarios.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.nombre ?? '').toLowerCase().includes(q) ||
      (u.email ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col min-h-full">
      <AdminPageHeader
        title="Usuarios"
        subtitle={`${usuarios.length} usuarios registrados`}
      />

      <div className="p-8 flex flex-col gap-6 flex-1">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o email..."
          aria-label="Buscar usuarios"
          className={`max-w-sm ${adminInputCls}`}
        />

        {error && (
          <div className="border border-error px-4 py-3" role="alert">
            <Typography variant="body-md" className="text-error">
              {error}
            </Typography>
          </div>
        )}

        <div className="border border-outline overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-outline bg-surface-container-low">
                <th className={adminThCls}>ID</th>
                <th className={adminThCls}>Nombre</th>
                <th className={adminThCls}>Email</th>
                <th className={adminThCls}>Rol</th>
                <th className={adminThCls}>Teléfono</th>
                <th className={adminThCls}>Activo</th>
                <th className={adminThCls}>Fecha Alta</th>
                <th className={adminThCls}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <Typography variant="label-caps" className="text-outline animate-pulse">
                      Cargando...
                    </Typography>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <Typography variant="body-md" className="text-outline">
                      No hay usuarios.
                    </Typography>
                  </td>
                </tr>
              ) : (
                filtered.map((u) => {
                  const esProtegido = ROLES_PROTEGIDOS.includes(u.rol);
                  return (
                    <tr
                      key={u.id}
                      className="border-b border-outline hover:bg-surface-container transition-colors"
                    >
                      <td className={adminTdCls}>
                        <Typography variant="label-caps" className="text-outline">
                          #{u.id}
                        </Typography>
                      </td>
                      <td className={adminTdCls}>
                        <Typography variant="body-md" className="text-on-surface font-bold">
                          {u.nombre}
                        </Typography>
                      </td>
                      <td className={adminTdCls}>
                        <Typography variant="body-md" className="text-outline">
                          {u.email}
                        </Typography>
                      </td>
                      <td className={adminTdCls}>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 border font-hanken font-bold text-[11px] tracking-widest uppercase ${
                            ROL_BADGE_CLS[u.rol] ?? 'text-outline border-outline'
                          }`}
                        >
                          {u.rol}
                        </span>
                      </td>
                      <td className={adminTdCls}>
                        <Typography variant="body-md" className="text-outline">
                          {u.telefono ?? '—'}
                        </Typography>
                      </td>
                      <td className={adminTdCls}>
                        <span
                          className={`font-hanken font-bold text-[11px] tracking-wider uppercase ${
                            u.activo ? 'text-green-400' : 'text-outline'
                          }`}
                        >
                          {u.activo ? '✓ Activo' : '✗ Inactivo'}
                        </span>
                      </td>
                      <td className={adminTdCls}>
                        <Typography variant="label-caps" className="text-outline">
                          {new Date(u.fechaCreacion).toLocaleDateString('es-AR')}
                        </Typography>
                      </td>
                      <td className={adminTdCls}>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(u)}
                            aria-label={`Editar usuario ${u.nombre}`}
                            className="border border-outline px-3 py-1.5 hover:border-primary transition-colors text-outline hover:text-primary"
                          >
                            <Pencil size={14} aria-hidden="true" />
                          </button>
                          {!esProtegido && (
                            <button
                              onClick={() => setModalDelete(u)}
                              aria-label={`Eliminar usuario ${u.nombre}`}
                              className="border border-outline px-3 py-1.5 hover:border-error transition-colors text-outline hover:text-error"
                            >
                              <Trash2 size={14} aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal
        open={!!modalEdit}
        onClose={() => setModalEdit(null)}
        title={`Editar: ${modalEdit?.nombre ?? ''}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="usr-nombre" className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
              Nombre
            </label>
            <input
              id="usr-nombre"
              required
              minLength={2}
              value={editNombre}
              onChange={(e) => setEditNombre(e.target.value)}
              className={adminInputCls}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="usr-telefono" className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
              Teléfono{' '}
              <span className="text-outline/50 normal-case font-normal">(opcional)</span>
            </label>
            <input
              id="usr-telefono"
              type="tel"
              value={editTelefono}
              onChange={(e) => setEditTelefono(e.target.value)}
              className={adminInputCls}
              placeholder="+54 11 1234-5678"
            />
          </div>

          {/* Checkbox brutalista de cuenta activa */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                editActivo ? 'bg-primary border-primary' : 'border-outline'
              }`}
              aria-hidden="true"
            >
              {editActivo && <Check size={12} className="text-on-primary" />}
            </div>
            <input
              type="checkbox"
              className="sr-only"
              checked={editActivo}
              onChange={(e) => setEditActivo(e.target.checked)}
            />
            <Typography variant="label-caps" className="text-on-surface">
              Cuenta activa
            </Typography>
          </label>

          {error && (
            <Typography variant="body-md" className="text-error">
              {error}
            </Typography>
          )}

          <div className="flex gap-3 justify-end pt-2 border-t border-outline">
            <button type="button" onClick={() => setModalEdit(null)} className={adminSecondaryBtnCls}>
              Cancelar
            </button>
            <button type="submit" disabled={saving} className={adminPrimaryBtnCls}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Modal Eliminar */}
      <AdminConfirmDelete
        open={!!modalDelete}
        resourceName={`${modalDelete?.nombre ?? ''} (${modalDelete?.email ?? ''})`}
        loading={saving}
        onCancel={() => setModalDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
