import { Link } from 'react-router-dom';
import { Typography } from '../ui';
import heroBg from '../../assets/heroSection/hero-background.jpg';

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-end overflow-hidden border-b border-outline">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroBg}
          alt="Vice — Bebidas Alcohólicas Premium"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 pb-16 md:pb-24 flex flex-col items-start gap-6">
        <div className="flex flex-col gap-3">
          <Typography
            variant="headline-xl"
            as="h1"
            className="text-primary uppercase leading-none text-[64px] md:text-[120px] tracking-[-0.02em]"
          >
            BEBIDAS
            <br />
            PREMIUM
          </Typography>
          <Typography variant="body-lg" className="text-outline uppercase tracking-widest max-w-md">
            Selección exclusiva de destilados y licores finos.
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
