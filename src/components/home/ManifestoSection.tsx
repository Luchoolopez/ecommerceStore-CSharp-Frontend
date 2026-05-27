import { Typography } from '../ui';

export const ManifestoSection = () => {
  return (
    <section className="w-full px-6 md:px-16 py-24 flex flex-col items-center justify-center text-center border-b border-outline">
      {/* Línea decorativa */}
      <div className="w-px h-16 bg-outline mb-10" />

      <div className="max-w-2xl flex flex-col items-center gap-6">
        <Typography
          variant="headline-lg"
          as="h2"
          className="text-primary uppercase leading-tight text-[40px] md:text-[64px]"
        >
          Materia y Vacío
        </Typography>

        <Typography variant="body-lg" className="text-outline leading-relaxed">
          Construimos fragancias como estructuras habitables. Cada nota es un bloque de hormigón, 
          cada acorde una viga de acero. Despojados de ornamentos, dejamos que la esencia cruda 
          interactúe con el espacio negativo.
        </Typography>

        <div className="flex gap-12 mt-6 border-t border-outline pt-8 w-full justify-center">
          <div className="flex flex-col items-center gap-1">
            <Typography variant="headline-md" as="span" className="text-primary">100%</Typography>
            <Typography variant="label-caps" className="text-outline text-center">Sin Sintéticos</Typography>
          </div>
          <div className="w-px bg-outline" />
          <div className="flex flex-col items-center gap-1">
            <Typography variant="headline-md" as="span" className="text-primary">30+</Typography>
            <Typography variant="label-caps" className="text-outline text-center">Notas Únicas</Typography>
          </div>
          <div className="w-px bg-outline" />
          <div className="flex flex-col items-center gap-1">
            <Typography variant="headline-md" as="span" className="text-primary">12h</Typography>
            <Typography variant="label-caps" className="text-outline text-center">Duración Media</Typography>
          </div>
        </div>
      </div>

      <div className="w-px h-16 bg-outline mt-10" />
    </section>
  );
};
