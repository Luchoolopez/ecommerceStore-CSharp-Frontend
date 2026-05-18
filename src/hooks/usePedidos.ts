import { useState, useCallback } from 'react';
import { pedidoService } from '../services/pedido.service';
import type { PedidoDto, CreatePedidoDto } from '../types/pedido.types';

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<PedidoDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await pedidoService.getAll();
      setPedidos(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar pedidos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPedido = async (data: CreatePedidoDto) => {
    try {
      setLoading(true);
      const newPedido = await pedidoService.create(data);
      setPedidos((prev) => [...prev, newPedido]);
      return newPedido;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear pedido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { pedidos, fetchPedidos, createPedido, loading, error };
};
