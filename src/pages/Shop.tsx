import { useEffect, useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { ShopGrid } from '../components/shop/ShopGrid';
import { Typography } from '../components/ui';
import { categoriaService } from '../services/categoria.service';
import { Footer } from '../components/layout/Footer';
import type { CategoriaDto } from '../types/categoria.types';

export const Shop = () => {
  const [categorias, setCategorias] = useState<CategoriaDto[]>([]);

  useEffect(() => {
    categoriaService.getAll()
      .then(setCategorias)
      .catch(() => setCategorias([]));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      {/* Header de sección */}
      <div className="w-full px-6 py-10 md:py-16 border-b border-outline">
        <Typography variant="headline-lg" className="text-on-surface">
          TIENDA
        </Typography>
        <Typography variant="body-md" className="text-outline mt-2">
          {categorias.length > 0 ? `${categorias.length} categorías disponibles` : 'Todos los productos'}
        </Typography>
      </div>

      {/* Grilla con filtros */}
      <ShopGrid categorias={categorias} />

      <Footer />
    </div>
  );
};
