import { useProductos } from '../../hooks/useProductos';
import { Typography } from '../ui';
import { ProductCard } from '../product/ProductCard';

export const FeaturedProducts = () => {
  const { productos, loading, error } = useProductos({ pageNumber: 1, pageSize: 4 });

  return (
    <section className="w-full flex flex-col bg-surface border-b border-outline">
      {/* Encabezado */}
      <div className="w-full p-6 border-b border-outline">
        <Typography variant="headline-md" className="text-on-surface">
          ÚLTIMOS INGRESOS
        </Typography>
      </div>

      {loading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <Typography variant="label-caps" className="text-on-surface animate-pulse">
            Cargando Inventario...
          </Typography>
        </div>
      ) : error ? (
        <div className="w-full h-64 flex items-center justify-center">
          <Typography variant="body-md" className="text-error">
            {error}
          </Typography>
        </div>
      ) : productos?.items && productos.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-outline">
          {productos.items.map((prod) => (
            <ProductCard
              key={prod.id}
              producto={prod}
              className="border-none"
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-64 flex flex-col items-center justify-center gap-4">
          <Typography variant="body-lg" className="text-on-surface opacity-50">
            No hay productos disponibles por el momento.
          </Typography>
        </div>
      )}
    </section>
  );
};
