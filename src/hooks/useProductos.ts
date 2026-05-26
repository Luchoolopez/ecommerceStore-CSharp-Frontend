import { useState, useEffect, useCallback } from 'react';
import { productoService } from '../services/producto.service';
import type { ProductoResponseDto, ProductoFilterDto } from '../types/producto.types';
import type { PagedResponse } from '../types/common.types';

export const useProductos = (initialParams?: ProductoFilterDto) => {
  const [productos, setProductos] = useState<PagedResponse<ProductoResponseDto> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Serializar los params para que el useEffect no se dispare en cada render
  // (los objetos literales siempre son referencias distintas aunque tengan los mismos valores)
  const initialParamsKey = JSON.stringify(initialParams);

  const fetchProductos = useCallback(async (params?: ProductoFilterDto) => {
    try {
      setLoading(true);
      setError(null);
      const resolvedParams = params ?? (initialParamsKey ? JSON.parse(initialParamsKey) : undefined);
      const data = await productoService.getAll(resolvedParams);
      setProductos(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialParamsKey]); // string estable — no cambia entre renders si los valores son iguales

  useEffect(() => {
    fetchProductos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialParamsKey]); // solo re-corre si los params realmente cambian

  return { productos, fetchProductos, loading, error };
};
