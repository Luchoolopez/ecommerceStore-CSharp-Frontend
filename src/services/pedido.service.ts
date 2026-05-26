import api from './api';
import type { PedidoDto, CreatePedidoDto } from '../types/pedido.types';
import type { ApiResponse } from '../types/common.types';

export const pedidoService = {
  getAll: async (): Promise<PedidoDto[]> => {
    const response = await api.get<ApiResponse<PedidoDto[]>>('/pedido/mis-compras');
    return response.data.data;
  },

  getById: async (id: number): Promise<PedidoDto> => {
    const response = await api.get<ApiResponse<PedidoDto>>(`/pedido/${id}`);
    return response.data.data;
  },

  create: async (data: CreatePedidoDto): Promise<PedidoDto> => {
    const response = await api.post<ApiResponse<PedidoDto>>('/pedido/checkout', data);
    return response.data.data;
  }
};
