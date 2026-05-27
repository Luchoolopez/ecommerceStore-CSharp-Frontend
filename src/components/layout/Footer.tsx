import { Link } from 'react-router-dom';
import { Typography } from '../ui';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-surface border-t-2 border-primary">
      <div className="px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-0">
        {/* Logo y copyright */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <Typography variant="headline-md" className="text-primary uppercase tracking-tighter">
            VICE
          </Typography>
          <Typography variant="label-caps" className="text-outline">
            © {currentYear} VICE. TODOS LOS DERECHOS RESERVADOS.
          </Typography>
        </div>

        {/* Links */}
        <div className="md:col-span-8 flex flex-col md:flex-row gap-8 md:justify-end">
          <nav className="flex flex-col gap-3">
            <Typography variant="label-caps" className="text-primary mb-2">Tienda</Typography>
            <Link to="/tienda" className="font-hanken text-[12px] tracking-[0.1em] uppercase text-outline hover:text-primary transition-colors">
              Catálogo
            </Link>
            <Link to="/tienda" className="font-hanken text-[12px] tracking-[0.1em] uppercase text-outline hover:text-primary transition-colors">
              Novedades
            </Link>
            <Link to="/tienda" className="font-hanken text-[12px] tracking-[0.1em] uppercase text-outline hover:text-primary transition-colors">
              Destacados
            </Link>
          </nav>

          <nav className="flex flex-col gap-3">
            <Typography variant="label-caps" className="text-primary mb-2">Información</Typography>
            <a href="#" className="font-hanken text-[12px] tracking-[0.1em] uppercase text-outline hover:text-primary transition-colors">
              Contacto
            </a>
            <a href="#" className="font-hanken text-[12px] tracking-[0.1em] uppercase text-outline hover:text-primary transition-colors">
              Envíos
            </a>
            <a href="#" className="font-hanken text-[12px] tracking-[0.1em] uppercase text-outline hover:text-primary transition-colors">
              Devoluciones
            </a>
          </nav>

          <nav className="flex flex-col gap-3">
            <Typography variant="label-caps" className="text-primary mb-2">Legal</Typography>
            <a href="#" className="font-hanken text-[12px] tracking-[0.1em] uppercase text-outline hover:text-primary transition-colors">
              Privacidad
            </a>
            <a href="#" className="font-hanken text-[12px] tracking-[0.1em] uppercase text-outline hover:text-primary transition-colors">
              Términos
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
