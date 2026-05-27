import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { useProductos } from '../../hooks/useProductos';
import { Typography, Button, Chip } from '../ui';
import { ProductCard } from '../product/ProductCard';
import type { ProductoFilterDto } from '../../types/producto.types';
import type { CategoriaDto } from '../../types/categoria.types';

interface ShopGridProps {
  categorias: CategoriaDto[];
}

export const ShopGrid: React.FC<ShopGridProps> = ({ categorias }) => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState<ProductoFilterDto>({ pageNumber: 1, pageSize: 12 });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { productos, loading, error } = useProductos(filtros);

  const handleCategoriaClick = useCallback((categoriaId?: number) => {
    setFiltros(prev => ({ ...prev, categoriaId, pageNumber: 1 }));
  }, []);

  const handleNuevo = useCallback((val?: boolean) => {
    setFiltros(prev => ({ ...prev, esNuevo: val, pageNumber: 1 }));
  }, []);

  const handleDestacado = useCallback((val?: boolean) => {
    setFiltros(prev => ({ ...prev, esDestacado: val, pageNumber: 1 }));
  }, []);

  const handlePagina = useCallback((pagina: number) => {
    setFiltros(prev => ({ ...prev, pageNumber: pagina }));
  }, []);

  const totalPaginas = productos?.totalPages ?? 1;
  const paginaActual = filtros.pageNumber ?? 1;

  return (
    <div className="flex flex-col w-full">
      {/* Barra de filtros */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-outline">
        <div className="flex items-center gap-4 flex-wrap">
          <Chip
            label="Todo"
            isActive={!filtros.categoriaId}
            onClick={() => handleCategoriaClick(undefined)}
          />
          {categorias.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.nombre}
              isActive={filtros.categoriaId === cat.id}
              onClick={() => handleCategoriaClick(cat.id)}
            />
          ))}
        </div>

        {/* Filtros extra (mobile toggle) */}
        <button
          className="flex items-center gap-2 border border-outline px-3 py-2 hover:border-primary transition-colors"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal size={16} />
          <Typography variant="label-caps">Filtros</Typography>
        </button>
      </div>

      {/* Panel de filtros extra */}
      {filtersOpen && (
        <div className="flex items-center gap-4 p-4 border-b border-outline bg-surface-dim flex-wrap">
          <Typography variant="label-caps" className="text-outline">Mostrar:</Typography>
          <Chip
            label="Nuevos"
            isActive={filtros.esNuevo === true}
            onClick={() => handleNuevo(filtros.esNuevo ? undefined : true)}
          />
          <Chip
            label="Destacados"
            isActive={filtros.esDestacado === true}
            onClick={() => handleDestacado(filtros.esDestacado ? undefined : true)}
          />
          {(filtros.esNuevo || filtros.esDestacado || filtros.categoriaId) && (
            <button
              className="flex items-center gap-1 text-error hover:text-on-surface transition-colors"
              onClick={() => {
                setFiltros({ pageNumber: 1, pageSize: 12 });
              }}
            >
              <X size={14} />
              <Typography variant="label-caps">Limpiar filtros</Typography>
            </button>
          )}
        </div>
      )}

      {/* Grilla */}
      {loading ? (
        <div className="w-full h-96 flex items-center justify-center">
          <Typography variant="label-caps" className="animate-pulse">Cargando productos...</Typography>
        </div>
      ) : error ? (
        <div className="w-full h-96 flex items-center justify-center">
          <Typography variant="body-md" className="text-error">{error}</Typography>
        </div>
      ) : productos?.items && productos.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-x divide-y divide-outline border-b border-outline">
          {productos.items.map((prod) => (
            <ProductCard key={prod.id} producto={prod} className="border-none" />
          ))}
        </div>
      ) : (
        <div className="w-full h-96 flex items-center justify-center">
          <Typography variant="body-lg" className="opacity-50">No se encontraron productos.</Typography>
        </div>
      )}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-2 p-6 border-t border-outline">
          <Button
            variant="secondary"
            onClick={() => handlePagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="px-4 py-2 text-sm"
          >
            ←
          </Button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => handlePagina(p)}
              className={`w-10 h-10 border transition-colors font-hanken font-bold text-sm
                ${p === paginaActual ? 'bg-primary text-on-primary border-primary' : 'border-outline text-on-surface hover:border-primary'}`}
            >
              {p}
            </button>
          ))}
          <Button
            variant="secondary"
            onClick={() => handlePagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="px-4 py-2 text-sm"
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
};
