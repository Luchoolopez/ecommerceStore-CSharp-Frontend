import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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
import { adminCategoriaService } from '../../services/admin.service';
import { extractErrorMessage } from '../../utils/api.helpers';
import type { CategoriaDto, CreateCategoriaDto, UpdateCategoriaDto } from '../../types/categoria.types';

// ─── Formulario de categoría ──────────────────────────────────────

interface CategoriaFormProps {
  nombre: string;
  descripcion: string;
  onNombreChange: (v: string) => void;
  onDescripcionChange: (v: string) => void;
}

const CategoriaForm = ({ nombre, descripcion, onNombreChange, onDescripcionChange }: CategoriaFormProps) => (
  <>
    <div className="flex flex-col gap-1">
      <label htmlFor="cat-nombre" className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
        Nombre
      </label>
      <input
        id="cat-nombre"
        required
        minLength={2}
        value={nombre}
        onChange={(e) => onNombreChange(e.target.value)}
        className={adminInputCls}
        placeholder="Amaderados"
      />
    </div>
    <div className="flex flex-col gap-1">
      <label htmlFor="cat-descripcion" className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
        Descripción
      </label>
      <textarea
        id="cat-descripcion"
        required
        value={descripcion}
        onChange={(e) => onDescripcionChange(e.target.value)}
        className={`${adminInputCls} resize-y min-h-[80px]`}
        placeholder="Descripción breve de la categoría..."
      />
    </div>
  </>
);

// ─── Página principal ─────────────────────────────────────────────

export const AdminCategorias = () => {
  const [items, setItems] = useState<CategoriaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados de modales
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState<CategoriaDto | null>(null);
  const [modalDelete, setModalDelete] = useState<CategoriaDto | null>(null);

  // Campos del formulario compartidos entre crear y editar
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setItems(await adminCategoriaService.getAll());
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const openCreate = () => {
    setNombre('');
    setDescripcion('');
    setError(null);
    setModalCreate(true);
  };

  const openEdit = (c: CategoriaDto) => {
    setNombre(c.nombre);
    setDescripcion(c.descripcion);
    setError(null);
    setModalEdit(c);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const dto: CreateCategoriaDto = { nombre: nombre.trim(), descripcion: descripcion.trim() };
    try {
      setSaving(true);
      setError(null);
      await adminCategoriaService.create(dto);
      setModalCreate(false);
      await cargar();
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEdit) return;
    const dto: UpdateCategoriaDto = { nombre: nombre.trim(), descripcion: descripcion.trim() };
    try {
      setSaving(true);
      setError(null);
      await adminCategoriaService.update(modalEdit.id, dto);
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
      await adminCategoriaService.delete(modalDelete.id);
      setModalDelete(null);
      await cargar();
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <AdminPageHeader
        title="Categorías"
        subtitle={`${items.length} categorías`}
        action={
          <button onClick={openCreate} className={`flex items-center gap-2 ${adminPrimaryBtnCls}`}>
            <Plus size={16} aria-hidden="true" /> Nueva Categoría
          </button>
        }
      />

      <div className="p-8 flex flex-col gap-6 flex-1">
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
                <th className={adminThCls}>Descripción</th>
                <th className={adminThCls}>Estado</th>
                <th className={adminThCls}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <Typography variant="label-caps" className="text-outline animate-pulse">
                      Cargando...
                    </Typography>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <Typography variant="body-md" className="text-outline">
                      No hay categorías.
                    </Typography>
                  </td>
                </tr>
              ) : (
                items.map((c) => (
                  <tr key={c.id} className="border-b border-outline hover:bg-surface-container transition-colors">
                    <td className={adminTdCls}>
                      <Typography variant="label-caps" className="text-outline">
                        #{c.id}
                      </Typography>
                    </td>
                    <td className={adminTdCls}>
                      <Typography variant="body-md" className="text-on-surface font-bold">
                        {c.nombre}
                      </Typography>
                    </td>
                    <td className={adminTdCls}>
                      <Typography variant="body-md" className="text-outline">
                        {c.descripcion || '—'}
                      </Typography>
                    </td>
                    <td className={adminTdCls}>
                      <span
                        className={`font-hanken font-bold text-[11px] tracking-wider uppercase ${
                          c.activo ? 'text-green-400' : 'text-outline'
                        }`}
                      >
                        {c.activo ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className={adminTdCls}>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          aria-label={`Editar categoría ${c.nombre}`}
                          className="border border-outline px-3 py-1.5 hover:border-primary transition-colors text-outline hover:text-primary"
                        >
                          <Pencil size={14} aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => setModalDelete(c)}
                          aria-label={`Eliminar categoría ${c.nombre}`}
                          className="border border-outline px-3 py-1.5 hover:border-error transition-colors text-outline hover:text-error"
                        >
                          <Trash2 size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Crear */}
      <AdminModal open={modalCreate} onClose={() => setModalCreate(false)} title="Nueva Categoría" maxWidth="max-w-md">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <CategoriaForm
            nombre={nombre}
            descripcion={descripcion}
            onNombreChange={setNombre}
            onDescripcionChange={setDescripcion}
          />
          {error && (
            <Typography variant="body-md" className="text-error" role="alert">
              {error}
            </Typography>
          )}
          <div className="flex gap-3 justify-end pt-2 border-t border-outline">
            <button type="button" onClick={() => setModalCreate(false)} className={adminSecondaryBtnCls}>
              Cancelar
            </button>
            <button type="submit" disabled={saving} className={adminPrimaryBtnCls}>
              {saving ? 'Guardando...' : 'Crear'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Modal Editar */}
      <AdminModal
        open={!!modalEdit}
        onClose={() => setModalEdit(null)}
        title={`Editar: ${modalEdit?.nombre ?? ''}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <CategoriaForm
            nombre={nombre}
            descripcion={descripcion}
            onNombreChange={setNombre}
            onDescripcionChange={setDescripcion}
          />
          {error && (
            <Typography variant="body-md" className="text-error" role="alert">
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
        resourceName={modalDelete?.nombre ?? ''}
        loading={saving}
        onCancel={() => setModalDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
