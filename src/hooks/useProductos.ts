import { useState, useEffect, useCallback } from 'react';
import { productoService } from '../services/producto.service';
import type { ProductoResponseDto, ProductoFilterDto } from '../types/producto.types';
import type { PagedResponse } from '../types/common.types';

export const useProductos = (initialParams?: ProductoFilterDto) => {
  const [productos, setProductos] = useState<PagedResponse<ProductoResponseDto> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = useCallback(async (params?: ProductoFilterDto) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productoService.getAll(params || initialParams);
      setProductos(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return { productos, fetchProductos, loading, error };
};
