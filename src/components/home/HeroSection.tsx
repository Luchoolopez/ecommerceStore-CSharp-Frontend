import { Link } from 'react-router-dom';
import { Typography } from '../ui';

// Imágenes reales subidas al proyecto Stitch por el usuario
const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNcoIfqTjZdpLFUpo8QXSQVmA_omRg4MN8EuOqOTpDkir_rpx9GpHks4B22WauqwNh5rhNdRNfCDmMYBVPEMLOvreOwZ0whb2hAgnOMJa0mix-iZJBuwX_3zLGIAkFQDktsTbxrlUumFht0ZzQBUJQ_ZVXrlCu0yyWINk62d69YkV4VKk0I2xy7MjMgqx367lhVjPYINYSCMMcoZtUgCrJ_DrSZQiRUQSSANUq6I6B3LET61YIV3pkvANS4uT-PHU9nFKani7cJJIn';

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-end overflow-hidden border-b border-outline">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={HERO_IMAGE}
          alt="Floyd — Fragancias de Autor"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay degradado para que el texto sea legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full px-6 md:px-16 pb-16 md:pb-24 flex flex-col items-start gap-6">
        <div className="flex flex-col gap-3">
          <Typography
            variant="headline-xl"
            as="h1"
            className="text-primary uppercase leading-none text-[64px] md:text-[120px] tracking-[-0.02em]"
          >
            FRAGANCIAS
            <br />
            DE AUTOR
          </Typography>
          <Typography variant="body-lg" className="text-outline uppercase tracking-widest max-w-md">
            La arquitectura del aroma.
          </Typography>
        </div>

        <Link
          to="/tienda"
          className="mt-2 inline-flex items-center gap-2 bg-primary text-on-primary font-hanken font-bold text-[12px] tracking-[0.15em] uppercase px-8 py-4 hover:bg-transparent hover:text-primary border border-primary transition-colors duration-300"
        >
          EXPLORAR COLECCIÓN
        </Link>
      </div>
    </section>
  );
};
