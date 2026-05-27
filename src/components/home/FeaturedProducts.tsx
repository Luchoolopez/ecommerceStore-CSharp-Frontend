import { Link } from 'react-router-dom';
import { Typography } from '../ui';
import { useProductos } from '../../hooks/useProductos';
import type { ProductoResponseDto } from '../../types/producto.types';

// Imágenes de las botellas subidas en Stitch
const BOTTLE_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCPt6VSGuTHBOfFymn-_RjT122BPzhMRI4ByHxvxotg7NbYYxPIEjrkkHj-bq7ThfQWFelOot2lcVhjrDTDmxCDhZvWV_Z-5esAYv0O0rUo1IueWaXFYRaXYihSS4NKdrG4r04SCobLaFl9smMALzFoec-prAze_K4_OLzw5stelHQIiQippZ0DXSBRNdYRGsJLhSX8XWtZITCGQljhVYnZ-fqaCBbly0mrPsE05ldADvdVLUETYDMiqwQQZI-Qpscq4pqtbl64XGOf',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDbizAqufhZ9iOngpDjDvyEMYiMLDRgaaN8UNQgswtMSR1PUO2y8jcF0c_kD1EVx_UqTWmk_g2N0fX7AVp89unObEXV9QeTb85qDM9OVSNySr2HL9uXbKjE3Eg2aV92a9AVkIZESyfVfKFsHptT_NcYQdIrMYdiegI8SnnOlA_9kI2g5OqyVBcagakpIqYrXtsRz4nWAnl5SjP-K9ClyPQ2hav3530XzpP9ZDDtxVLKkVICqLrbpZFIRsRKeQNcjy3womwY9gqDLX0m',
  'https://lh3.googleusercontent.com/aida/ADBb0uitnrVkEohXSA0DKMCRPBl49WPnfMkl-P4W86GBf8cD8MNLXPWFm-5_dFF0MGuaKto2DgMKN5m5-YkX_OytlbMMm0gwaibJ_M2R304Vz_VJ6oAYo5hRWA4PcZ3ipc3aF1ZrGtaJwwdwsyc22Rmq8eT_eUuGRLJVTR5TBaWD8SYgj0xvDOmOtMJb5uFQ-nMBPJ5IMb5sLsP_poTdXWKWdY4zaZVnLQoNqHYQZGMlmwqMZsZF8Uw0_PM-vJwZ',
  'https://lh3.googleusercontent.com/aida/ADBb0ugDXnn6uPMW77OgsETTcWVx7kGrGgTOP18b01DiRmm9R7SLu0jhQUJgralxzL2Mn8w8Me2H4GIdHlBqoTcj5SNqaIoQYGAejhhcgAAjJDpLH7nKEo4wjkRCtMEBYwpU2PP_Hk8kEPdGVMvtrevJ63GOMv0-97oIsE1dY5YdcGi0_QQ9nVXydlemqdGPaQAgRf-lHtFoWDHqVQarNiLOvB9JVHAtkzyBa_nfoTxj3dVLsjTmhkZyo5hTRT5M',
];

interface FeaturedCardProps {
  producto: ProductoResponseDto;
  index: number;
  featured?: boolean; // para la card grande horizontal
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ producto, index, featured = false }) => {
  const fallback = BOTTLE_IMAGES[index % BOTTLE_IMAGES.length];
  const imagen = producto.imagenPrincipal || fallback;
  const tieneDescuento = producto.descuento > 0;

  if (featured) {
    return (
      <Link
        to={`/producto/${producto.id}`}
        className="col-span-12 flex flex-col md:flex-row border border-outline group hover:border-primary transition-colors duration-300"
      >
        {/* Imagen grande */}
        <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative overflow-hidden border-b md:border-b-0 md:border-r border-outline">
          <img
            src={imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {producto.esNuevo && (
            <span className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1">
              <Typography variant="label-caps" as="span">Nuevo</Typography>
            </span>
          )}
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-6 bg-surface">
          <div className="flex flex-col gap-2 border-b-2 border-primary pb-8">
            {producto.categoriaNombre && (
              <Typography variant="label-caps" className="text-outline uppercase tracking-[0.2em]">
                {producto.categoriaNombre}
              </Typography>
            )}
            <Typography variant="headline-lg" as="h3" className="text-primary uppercase leading-tight text-[40px] md:text-[64px]">
              {producto.nombre}
            </Typography>
            <div className="flex items-baseline gap-4 mt-2">
              <Typography variant="headline-md" as="span" className="text-primary">
                ${producto.precioFinal.toFixed(2)}
              </Typography>
              {tieneDescuento && (
                <Typography variant="body-lg" as="span" className="text-outline line-through">
                  ${producto.precioBase.toFixed(2)}
                </Typography>
              )}
            </div>
          </div>

          {producto.descripcion && (
            <Typography variant="body-lg" className="text-outline leading-relaxed max-w-md">
              {producto.descripcion}
            </Typography>
          )}

          <span className="self-start border border-outline text-primary font-hanken font-bold text-[12px] tracking-[0.15em] uppercase px-8 py-4 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
            VER PRODUCTO
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/producto/${producto.id}`}
      className="col-span-12 md:col-span-6 flex flex-col border border-outline group hover:border-primary transition-colors duration-300 bg-surface"
    >
      {/* Imagen */}
      <div className="relative w-full aspect-[3/4] overflow-hidden border-b border-outline">
        <img
          src={imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {tieneDescuento && (
          <span className="absolute top-4 right-4 bg-error text-on-error px-2 py-1">
            <Typography variant="label-caps" as="span">-{producto.descuento}%</Typography>
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start border-b border-outline pb-4">
            <Typography variant="headline-md" as="h3" className="text-primary uppercase line-clamp-2">
              {producto.nombre}
            </Typography>
            <div className="flex flex-col items-end">
              <Typography variant="body-lg" as="span" className="text-primary whitespace-nowrap">
                ${producto.precioFinal.toFixed(2)}
              </Typography>
              {tieneDescuento && (
                <Typography variant="label-caps" as="span" className="text-outline line-through">
                  ${producto.precioBase.toFixed(2)}
                </Typography>
              )}
            </div>
          </div>

          {producto.descripcion && (
            <Typography variant="label-caps" className="text-outline mt-3 line-clamp-2">
              {producto.descripcion}
            </Typography>
          )}
        </div>
      </div>
    </Link>
  );
};

export const FeaturedProducts = () => {
  const { productos, loading, error } = useProductos({ pageNumber: 1, pageSize: 4 });

  return (
    <section className="w-full px-6 md:px-16 py-20 border-b border-outline">
      {/* Encabezado de sección */}
      <div className="mb-12 flex justify-between items-end border-b border-outline pb-4">
        <Typography variant="headline-md" className="text-primary uppercase">
          Nuevas Adiciones
        </Typography>
        <Link
          to="/tienda"
          className="font-hanken text-[12px] font-bold tracking-[0.15em] uppercase text-outline hover:text-primary transition-colors duration-200"
        >
          Ver todo
        </Link>
      </div>

      {loading ? (
        <div className="w-full h-80 flex items-center justify-center">
          <Typography variant="label-caps" className="text-outline animate-pulse tracking-widest">
            Cargando productos...
          </Typography>
        </div>
      ) : error ? (
        <div className="w-full h-80 flex items-center justify-center">
          <Typography variant="body-md" className="text-error">{error}</Typography>
        </div>
      ) : productos?.items && productos.items.length > 0 ? (
        <div className="grid grid-cols-12 gap-px bg-outline border border-outline">
          {productos.items.map((prod, idx) =>
            idx === 0 ? (
              <FeaturedCard key={prod.id} producto={prod} index={idx} featured />
            ) : (
              <FeaturedCard key={prod.id} producto={prod} index={idx} />
            )
          )}
        </div>
      ) : (
        <div className="w-full h-80 flex items-center justify-center border border-outline">
          <Typography variant="body-lg" className="text-outline opacity-50">
            No hay productos disponibles por el momento.
          </Typography>
        </div>
      )}
    </section>
  );
};
