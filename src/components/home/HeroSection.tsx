import { Typography, Button } from '../ui';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] border-b border-outline overflow-hidden bg-surface flex items-center">
      {/* Background Image - Neutral/Alcohol Premium Aesthetic */}
      <div className="absolute inset-0 opacity-40 grayscale mix-blend-luminosity">
        <img 
          src="'../../assets/heroSection/hero-background.jpg'" 
          alt="Premium Bottle Display" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-24 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8 mt-12">
        <Typography variant="headline-xl" className="text-on-surface whitespace-pre-line leading-[0.85] text-[80px] md:text-[120px]">
          {'RESERVA\nPREMIUM'}
        </Typography>
        
        <Typography variant="body-lg" className="max-w-md text-on-surface">
          Exclusividad capturada en cristal. Descubrí nuestra selección curada de reservas de alta gama y destilados minimalistas. Sin concesiones, pura esencia.
        </Typography>

        <Link to="/shop">
          <Button variant="primary" className="mt-4 w-full md:w-auto">
            EXPLORAR COLECCIÓN
          </Button>
        </Link>
      </div>
    </section>
  );
};
