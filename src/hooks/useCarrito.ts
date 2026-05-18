import { useState, useCallback } from 'react';
import { carritoService } from '../services/carrito.service';
import type { CarritoDto } from '../types/carrito.types';

export const useCarrito = () => {
  const [carrito, setCarrito] = useState<CarritoDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCarrito = useCallback(async () => {
    try {
      setLoading(true);
      const data = await carritoService.getCarrito();
      setCarrito(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = async (varianteId: number, cantidad: number) => {
    try {
      setLoading(true);
      const data = await carritoService.addItem(varianteId, cantidad);
      setCarrito(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al agregar item al carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (varianteId: number) => {
    try {
      setLoading(true);
      const data = await carritoService.removeItem(varianteId);
      setCarrito(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar item del carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { carrito, fetchCarrito, addItem, removeItem, loading, error };
};
