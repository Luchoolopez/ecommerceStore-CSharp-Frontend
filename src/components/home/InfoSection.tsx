import { Typography } from '../ui/Typography';
import { Clock, Droplets, Star, Wine } from 'lucide-react';

export const InfoSection = () => {
  return (
    <section className="w-full bg-surface py-20 px-6 md:px-24 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col gap-12">
        
        <div className="flex flex-col gap-6 max-w-3xl">
          <Typography variant="label-caps" className="text-primary">
            NUESTRA ESENCIA
          </Typography>
          
          <Typography variant="headline-md" className="text-on-surface">
            Mucho más que una botella
          </Typography>
          
          <Typography variant="body-lg" className="text-on-surface/80">
            En Vice reunimos una selección exclusiva de bebidas premium para quienes valoran la calidad, el diseño y la experiencia detrás de cada etiqueta. Desde ediciones clásicas hasta lanzamientos únicos, cada botella representa carácter, estilo y momentos que merecen disfrutarse.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-8 md:p-12 border border-outline bg-surface relative">
          <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />

          <div className="flex flex-col gap-3 relative z-10">
            <Clock className="text-primary mb-1" size={24} strokeWidth={1.5} />
            <Typography variant="label-caps" className="text-on-surface text-[14px]">
              ENTREGA RÁPIDA
            </Typography>
            <Typography variant="body-md" className="text-on-surface/70 text-[14px]">
              Procesamos cada pedido con rapidez y cuidado para que recibas tus botellas en el menor tiempo posible.
            </Typography>
          </div>

          <div className="flex flex-col gap-3 relative z-10">
            <Droplets className="text-primary mb-1" size={24} strokeWidth={1.5} />
            <Typography variant="label-caps" className="text-on-surface text-[14px]">
              GRAN VARIEDAD
            </Typography>
            <Typography variant="body-md" className="text-on-surface/70 text-[14px]">
              Explorá una amplia colección de bebidas seleccionadas para todos los gustos y ocasiones especiales.
            </Typography>
          </div>

          <div className="flex flex-col gap-3 relative z-10">
            <Star className="text-primary mb-1" size={24} strokeWidth={1.5} />
            <Typography variant="label-caps" className="text-on-surface text-[14px]">
              SELECCIÓN PREMIUM
            </Typography>
            <Typography variant="body-md" className="text-on-surface/70 text-[14px]">
              Trabajamos únicamente con etiquetas destacadas por su calidad, presentación y reconocimiento.
            </Typography>
          </div>

          <div className="flex flex-col gap-3 relative z-10">
            <Wine className="text-primary mb-1" size={24} strokeWidth={1.5} />
            <Typography variant="label-caps" className="text-on-surface text-[14px]">
              EXPERIENCIA ÚNICA
            </Typography>
            <Typography variant="body-md" className="text-on-surface/70 text-[14px]">
              Cada botella está pensada para acompañar celebraciones, regalos o momentos inolvidables.
            </Typography>
          </div>

        </div>
      </div>
    </section>
  );
};