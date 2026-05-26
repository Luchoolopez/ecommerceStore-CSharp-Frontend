import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '../ui';
import type { ProductoResponseDto } from '../../types/producto.types';

interface ProductCardProps {
  producto: ProductoResponseDto;
  className?: string;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=800&auto=format&fit=crop';

export const ProductCard: React.FC<ProductCardProps> = ({ producto, className = '' }) => {
  const { id, nombre, precioBase, precioFinal, descuento, imagenPrincipal, esNuevo, esDestacado } = producto;
  const tieneDescuento = descuento > 0;

  return (
    <Link
      to={`/producto/${id}`}
      className={`border border-outline group flex flex-col rounded-none bg-surface hover:bg-surface-bright transition-colors ${className}`}
    >
      {/* Imagen */}
      <div className="relative w-full aspect-[4/5] overflow-hidden border-b border-outline">
        <img
          src={imagenPrincipal || FALLBACK_IMAGE}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {esNuevo && (
            <span className="bg-primary text-on-primary px-2 py-1">
              <Typography variant="label-caps" as="span">Nuevo</Typography>
            </span>
          )}
          {esDestacado && (
            <span className="bg-on-surface text-surface px-2 py-1">
              <Typography variant="label-caps" as="span">Destacado</Typography>
            </span>
          )}
        </div>
        {/* Descuento */}
        {tieneDescuento && (
          <span className="absolute top-3 right-3 bg-error text-on-error px-2 py-1">
            <Typography variant="label-caps" as="span">-{descuento}%</Typography>
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <Typography variant="body-md" as="h3" className="text-on-surface line-clamp-2">
          {nombre}
        </Typography>
        <div className="flex items-center gap-3 mt-1">
          <Typography variant="label-caps" as="span" className="text-primary">
            ${precioFinal.toFixed(2)}
          </Typography>
          {tieneDescuento && (
            <Typography variant="label-caps" as="span" className="text-outline line-through">
              ${precioBase.toFixed(2)}
            </Typography>
          )}
        </div>
      </div>
    </Link>
  );
};
