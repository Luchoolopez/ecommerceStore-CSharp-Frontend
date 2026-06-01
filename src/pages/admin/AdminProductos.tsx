import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Upload, Check } from 'lucide-react';
import { Typography } from '../../components/ui';
import { AdminModal } from '../../components/admin/AdminModal';
import {
  AdminPageHeader,
  AdminConfirmDelete,
  adminInputCls,
  adminSelectCls,
  adminPrimaryBtnCls,
  adminSecondaryBtnCls,
  adminThCls,
  adminTdCls,
} from '../../components/admin/adminShared';
import { adminProductoService, adminCategoriaService } from '../../services/admin.service';
import { extractErrorMessage } from '../../utils/api.helpers';
import type { CategoriaDto } from '../../types/categoria.types';
import type { ProductoResponseDto, CreateProductoDto, UpdateProductoDto } from '../../types/producto.types';

// ─── Campo de formulario ──────────────────────────────────────────
const Field = ({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
      {label}
      {optional && <span className="font-normal normal-case text-outline/50 ml-1">(opcional)</span>}
    </label>
    {children}
  </div>
);


// ─── Formulario de Producto ───────────────────────────────────────
interface ProductoFormData {
  nombre: string;
  descripcion: string;
  sku: string;
  precioBase: string;
  descuento: string;
  peso: string;
  categoriaId: string;
  esNuevo: boolean;
  esDestacado: boolean;
  activo: boolean;
  metaTitle: string;
  metaDescription: string;
}

const emptyForm = (): ProductoFormData => ({
  nombre: '',
  descripcion: '',
  sku: '',
  precioBase: '',
  descuento: '0',
  peso: '',
  categoriaId: '',
  esNuevo: false,
  esDestacado: false,
  activo: true,
  metaTitle: '',
  metaDescription: '',
});

const fromProducto = (p: ProductoResponseDto): ProductoFormData => ({
  nombre: p.nombre,
  descripcion: p.descripcion ?? '',
  sku: p.sku ?? '',
  precioBase: String(p.precioBase),
  descuento: String(p.descuento),
  peso: p.peso != null ? String(p.peso) : '',
  categoriaId: p.categoriaId != null ? String(p.categoriaId) : '',
  esNuevo: p.esNuevo,
  esDestacado: p.esDestacado,
  activo: p.activo,
  metaTitle: '',
  metaDescription: '',
});

const ProductoForm = ({
  form,
  setForm,
  categorias,
}: {
  form: ProductoFormData;
  setForm: React.Dispatch<React.SetStateAction<ProductoFormData>>;
  categorias: Pick<CategoriaDto, 'id' | 'nombre'>[];
}) => {
  const set = (key: keyof ProductoFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const setB = (key: keyof ProductoFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nombre">
              <input className={adminInputCls} value={form.nombre} onChange={set('nombre')} required placeholder="Obsidian Noir" />
        </Field>
        <Field label="SKU" optional>
              <input className={adminInputCls} value={form.sku} onChange={set('sku')} placeholder="OBS-001" />
        </Field>
      </div>
      <Field label="Descripción" optional>
        <textarea
              className={`${adminInputCls} resize-y min-h-[80px]`}
          value={form.descripcion}
          onChange={set('descripcion')}
          placeholder="Descripción del producto..."
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Precio Base ($)">
              <input type="number" min="0.01" step="0.01" className={adminInputCls} value={form.precioBase} onChange={set('precioBase')} required placeholder="99.99" />
        </Field>
        <Field label="Descuento (%)">
              <input type="number" min="0" max="100" className={adminInputCls} value={form.descuento} onChange={set('descuento')} placeholder="0" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Peso (kg)" optional>
              <input type="number" min="0" step="0.01" className={adminInputCls} value={form.peso} onChange={set('peso')} placeholder="0.10" />
        </Field>
        <Field label="Categoría" optional>
              <select className={adminSelectCls} value={form.categoriaId} onChange={set('categoriaId')}>
            <option value="">Sin categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="flex flex-col gap-2 border border-outline p-4">
        <Typography variant="label-caps" className="text-outline mb-1">Flags</Typography>
        {(['esNuevo', 'esDestacado', 'activo'] as const).map((key) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer select-none">
            <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${form[key] ? 'bg-primary border-primary' : 'border-outline'}`}>
              {form[key] && <Check size={12} className="text-on-primary" />}
            </div>
            <input type="checkbox" className="sr-only" checked={form[key] as boolean} onChange={setB(key)} />
            <Typography variant="label-caps" className="text-on-surface">
              {key === 'esNuevo' ? 'Es Nuevo' : key === 'esDestacado' ? 'Es Destacado' : 'Activo'}
            </Typography>
          </label>
        ))}
      </div>
    </>
  );
};

// ─── Página principal ─────────────────────────────────────────────
export const AdminProductos = () => {
  const [productos, setProductos] = useState<ProductoResponseDto[]>([]);
  const [categorias, setCategorias] = useState<Pick<CategoriaDto, 'id' | 'nombre'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Modal estados
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState<ProductoResponseDto | null>(null);
  const [modalDelete, setModalDelete] = useState<ProductoResponseDto | null>(null);
  const [modalImagen, setModalImagen] = useState<ProductoResponseDto | null>(null);

  const [formCreate, setFormCreate] = useState<ProductoFormData>(emptyForm());
  const [formEdit, setFormEdit] = useState<ProductoFormData>(emptyForm());
  const [imageFile, setImageFile] = useState<File | null>(null);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [prods, cats] = await Promise.all([
        adminProductoService.getAll(),
        adminCategoriaService.getAll(),
      ]);
      setProductos(prods.items);
      setCategorias(cats);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  const buildCreateDto = (f: ProductoFormData): CreateProductoDto => ({
    nombre: f.nombre.trim(),
    descripcion: f.descripcion.trim() || undefined,
    sku: f.sku.trim() || undefined,
    precioBase: parseFloat(f.precioBase),
    descuento: parseFloat(f.descuento) || 0,
    peso: f.peso ? parseFloat(f.peso) : undefined,
    categoriaId: f.categoriaId ? parseInt(f.categoriaId) : undefined,
    esNuevo: f.esNuevo,
    esDestacado: f.esDestacado,
    activo: f.activo,
  });

  const buildUpdateDto = (f: ProductoFormData): UpdateProductoDto => ({
    nombre: f.nombre.trim(),
    descripcion: f.descripcion.trim() || undefined,
    sku: f.sku.trim() || undefined,
    precioBase: parseFloat(f.precioBase),
    descuento: parseFloat(f.descuento) || 0,
    peso: f.peso ? parseFloat(f.peso) : undefined,
    categoriaId: f.categoriaId ? parseInt(f.categoriaId) : undefined,
    esNuevo: f.esNuevo,
    esDestacado: f.esDestacado,
    activo: f.activo,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      await adminProductoService.create(buildCreateDto(formCreate));
      setModalCreate(false);
      setFormCreate(emptyForm());
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
    try {
      setSaving(true);
      setError(null);
      await adminProductoService.update(modalEdit.id, buildUpdateDto(formEdit));
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
      await adminProductoService.delete(modalDelete.id);
      setModalDelete(null);
      await cargar();
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleUploadImagen = async () => {
    if (!modalImagen || !imageFile) return;
    try {
      setSaving(true);
      setError(null);
      await adminProductoService.uploadImagen(modalImagen.id, imageFile);
      setModalImagen(null);
      setImageFile(null);
      await cargar();
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const filtered = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full">
      <AdminPageHeader
        title="Productos"
        subtitle={`${productos.length} productos en total`}
        action={
          <button
            onClick={() => { setFormCreate(emptyForm()); setError(null); setModalCreate(true); }}
            className={`flex items-center gap-2 ${adminPrimaryBtnCls}`}
          >
            <Plus size={16} aria-hidden="true" /> Nuevo Producto
          </button>
        }
      />

      <div className="p-8 flex flex-col gap-6 flex-1">
        {/* Buscador */}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o SKU..."
          className={`max-w-sm bg-transparent border border-outline focus:border-primary text-on-surface font-hanken text-[15px] px-4 py-2.5 outline-none transition-colors placeholder:text-outline/40`}
        />

        {error && (
          <div className="border border-error px-4 py-3">
            <Typography variant="body-md" className="text-error">{error}</Typography>
          </div>
        )}

        {/* Tabla */}
        <div className="border border-outline overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-outline bg-surface-container-low">
                {['Imagen', 'Nombre / SKU', 'Precio', 'Dcto.', 'Categoría', 'Estado', 'Acciones'].map((h) => (
                  <th key={h} className={adminThCls}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Typography variant="label-caps" className="text-outline animate-pulse">Cargando...</Typography>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Typography variant="body-md" className="text-outline">No hay productos.</Typography>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-b border-outline hover:bg-surface-container transition-colors">
                    {/* Imagen */}
                    <td className="px-4 py-3">
                      <div
                        className="w-10 h-10 border border-outline overflow-hidden bg-surface-container cursor-pointer hover:border-primary transition-colors"
                        onClick={() => setModalImagen(p)}
                        title="Cambiar imagen"
                      >
                        {p.imagenPrincipal ? (
                          <img src={p.imagenPrincipal} alt={p.nombre} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Upload size={14} className="text-outline" />
                          </div>
                        )}
                      </div>
                    </td>
                    {/* Nombre / SKU */}
                    <td className="px-4 py-3">
                      <Typography variant="body-md" className="text-on-surface font-bold">{p.nombre}</Typography>
                      {p.sku && <Typography variant="label-caps" className="text-outline">{p.sku}</Typography>}
                    </td>
                    {/* Precio */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Typography variant="body-md" className="text-primary">${p.precioBase.toFixed(2)}</Typography>
                    </td>
                    {/* Descuento */}
                    <td className="px-4 py-3">
                      <span className={`font-hanken font-bold text-[12px] ${p.descuento > 0 ? 'text-error' : 'text-outline'}`}>
                        {p.descuento > 0 ? `-${p.descuento}%` : '—'}
                      </span>
                    </td>
                    {/* Categoría */}
                    <td className="px-4 py-3">
                      <Typography variant="label-caps" className="text-outline">{p.categoriaNombre ?? '—'}</Typography>
                    </td>
                    {/* Estado */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {p.activo ? (
                          <span className="inline-flex items-center gap-1 font-hanken font-bold text-[11px] tracking-wider uppercase text-green-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-hanken font-bold text-[11px] tracking-wider uppercase text-outline">
                            <span className="w-1.5 h-1.5 rounded-full bg-outline" /> Inactivo
                          </span>
                        )}
                        {p.esNuevo && <span className="font-hanken font-bold text-[10px] uppercase text-primary">Nuevo</span>}
                        {p.esDestacado && <span className="font-hanken font-bold text-[10px] uppercase text-primary">Destacado</span>}
                      </div>
                    </td>
                    {/* Acciones */}
                    <td className={adminTdCls}>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setFormEdit(fromProducto(p)); setError(null); setModalEdit(p); }}
                          aria-label={`Editar producto ${p.nombre}`}
                          className="border border-outline px-3 py-1.5 hover:border-primary transition-colors text-outline hover:text-primary"
                        >
                          <Pencil size={14} aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => { setError(null); setModalDelete(p); }}
                          aria-label={`Eliminar producto ${p.nombre}`}
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
      <AdminModal open={modalCreate} onClose={() => setModalCreate(false)} title="Nuevo Producto">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <ProductoForm form={formCreate} setForm={setFormCreate} categorias={categorias} />
          {error && <Typography variant="body-md" className="text-error" role="alert">{error}</Typography>}
          <div className="flex gap-3 justify-end pt-2 border-t border-outline">
            <button type="button" onClick={() => setModalCreate(false)} className={adminSecondaryBtnCls}>Cancelar</button>
            <button type="submit" disabled={saving} className={adminPrimaryBtnCls}>
              {saving ? 'Guardando...' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Modal Editar */}
      <AdminModal open={!!modalEdit} onClose={() => setModalEdit(null)} title={`Editar: ${modalEdit?.nombre ?? ''}`}>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <ProductoForm form={formEdit} setForm={setFormEdit} categorias={categorias} />
          {error && <Typography variant="body-md" className="text-error" role="alert">{error}</Typography>}
          <div className="flex gap-3 justify-end pt-2 border-t border-outline">
            <button type="button" onClick={() => setModalEdit(null)} className={adminSecondaryBtnCls}>Cancelar</button>
            <button type="submit" disabled={saving} className={adminPrimaryBtnCls}>
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Modal Imagen */}
      <AdminModal
        open={!!modalImagen}
        onClose={() => { setModalImagen(null); setImageFile(null); }}
        title={`Imagen: ${modalImagen?.nombre ?? ''}`}
        maxWidth="max-w-md"
      >
        <div className="flex flex-col gap-4">
          {modalImagen?.imagenPrincipal && (
            <img src={modalImagen.imagenPrincipal} alt={modalImagen.nombre} className="w-full max-h-48 object-contain border border-outline" />
          )}
          <label className="flex flex-col items-center justify-center border border-dashed border-outline p-8 cursor-pointer hover:border-primary transition-colors gap-2">
            <Upload size={24} className="text-outline" aria-hidden="true" />
            <Typography variant="label-caps" className="text-outline">
              {imageFile ? imageFile.name : 'Seleccionar imagen'}
            </Typography>
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
          </label>
          <div className="flex gap-3 justify-end border-t border-outline pt-4">
            <button onClick={() => { setModalImagen(null); setImageFile(null); }} className={adminSecondaryBtnCls}>Cancelar</button>
            <button onClick={handleUploadImagen} disabled={!imageFile || saving} className={adminPrimaryBtnCls}>
              {saving ? 'Subiendo...' : 'Subir Imagen'}
            </button>
          </div>
        </div>
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
