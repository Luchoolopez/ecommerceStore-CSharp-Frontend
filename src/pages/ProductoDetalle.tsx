import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Typography, Button, Chip } from '../components/ui';
import { useToast } from '../components/ui/toast';
import { useCartContext } from '../context/cartContext';
import type { ProductoResponseDto } from '../types/producto.types';
import { productoService } from '../services/producto.service';
import { useEffect } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=800&auto=format&fit=crop';

export const ProductoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { addItem } = useCartContext();
  const [producto, setProducto] = useState<ProductoResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [agregando, setAgregando] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productoService.getById(Number(id))
      .then(setProducto)
      .catch(() => setError('No se encontró el producto.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAgregar = async () => {
    if (!producto) return;
    // Necesitamos la varianteId — por ahora mostramos aviso si no hay variantes
    // Cuando se añada la pantalla de variantes, se reemplaza aquí
    showToast('Seleccioná una variante para agregar al carrito.', 'info');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Typography variant="label-caps" className="animate-pulse">Cargando producto...</Typography>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Typography variant="body-lg" className="text-error">{error || 'Producto no encontrado.'}</Typography>
          <Button variant="secondary" onClick={() => navigate('/tienda')}>Volver a la tienda</Button>
        </div>
      </div>
    );
  }

  const tieneDescuento = producto.descuento > 0;

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      {/* Breadcrumb */}
      <div className="px-6 py-4 border-b border-outline">
        <button onClick={() => navigate('/tienda')} className="text-outline hover:text-primary transition-colors">
          <Typography variant="label-caps">← Volver a la tienda</Typography>
        </button>
      </div>

      {/* Layout principal */}
      <div className="flex flex-col md:flex-row flex-1 border-b border-outline">
        {/* Imagen */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-outline">
          <div className="relative w-full aspect-square">
            <img
              src={producto.imagenPrincipal || FALLBACK_IMAGE}
              alt={producto.nombre}
              className="w-full h-full object-cover"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {producto.esNuevo && (
                <span className="bg-primary text-on-primary px-3 py-1">
                  <Typography variant="label-caps" as="span">Nuevo</Typography>
                </span>
              )}
              {producto.esDestacado && (
                <span className="bg-on-surface text-surface px-3 py-1">
                  <Typography variant="label-caps" as="span">Destacado</Typography>
                </span>
              )}
            </div>
            {tieneDescuento && (
              <span className="absolute top-4 right-4 bg-error text-on-error px-3 py-1">
                <Typography variant="label-caps" as="span">-{producto.descuento}%</Typography>
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col p-6 md:p-12 gap-6">
          {producto.categoriaNombre && (
            <Typography variant="label-caps" className="text-outline">{producto.categoriaNombre}</Typography>
          )}

          <Typography variant="headline-md" as="h1" className="text-on-surface">
            {producto.nombre}
          </Typography>

          {/* Precio */}
          <div className="flex items-baseline gap-4 border-y border-outline py-4">
            <Typography variant="headline-md" as="span" className="text-primary">
              ${(producto.precioFinal ?? producto.precioBase).toFixed(2)}
            </Typography>
            {tieneDescuento && (
              <Typography variant="body-lg" as="span" className="text-outline line-through">
                ${producto.precioBase.toFixed(2)}
              </Typography>
            )}
          </div>

          {/* Descripción */}
          {producto.descripcion && (
            <Typography variant="body-md" className="text-outline leading-relaxed">
              {producto.descripcion}
            </Typography>
          )}

          {/* Cantidad */}
          <div className="flex flex-col gap-2">
            <Typography variant="label-caps" className="text-outline">Cantidad</Typography>
            <div className="flex items-center border border-outline w-fit">
              <button
                className="w-10 h-10 flex items-center justify-center hover:bg-surface-bright transition-colors font-bold text-on-surface"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              >
                −
              </button>
              <span className="w-12 h-10 flex items-center justify-center border-x border-outline font-hanken text-on-surface">
                {cantidad}
              </span>
              <button
                className="w-10 h-10 flex items-center justify-center hover:bg-surface-bright transition-colors font-bold text-on-surface"
                onClick={() => setCantidad((c) => c + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* CTA */}
          <Button
            variant="primary"
            fullWidth
            onClick={handleAgregar}
            disabled={agregando}
            className="mt-2"
          >
            {agregando ? 'AGREGANDO...' : 'AGREGAR AL CARRITO'}
          </Button>

          {/* Meta */}
          {producto.sku && (
            <Typography variant="label-caps" className="text-outline mt-4">
              SKU: {producto.sku}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
