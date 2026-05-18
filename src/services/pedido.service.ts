import api from './api';
import type { PedidoDto, CreatePedidoDto } from '../types/pedido.types';

export const pedidoService = {
  getAll: async (): Promise<PedidoDto[]> => {
    const response = await api.get<PedidoDto[]>('/pedido/mis-compras');
    return response.data;
  },

  getById: async (id: number): Promise<PedidoDto> => {
    const response = await api.get<PedidoDto>(`/pedido/${id}`);
    return response.data;
  },  

  create: async (data: CreatePedidoDto): Promise<PedidoDto> => {
    const response = await api.post<PedidoDto>('/pedido/checkout', data);
    return response.data;
  }
};
