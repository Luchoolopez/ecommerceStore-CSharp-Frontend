import api from './api';
import type { PedidoResponseDto, CheckoutRequestDto } from '../types/pedido.types';
import type { ApiResponse } from '../types/common.types';

export const pedidoService = {
  getAll: async (): Promise<PedidoResponseDto[]> => {
    const response = await api.get<ApiResponse<PedidoResponseDto[]>>('/pedido/mis-compras');
    return response.data.data;
  },

  getById: async (id: number): Promise<PedidoResponseDto> => {
    const response = await api.get<ApiResponse<PedidoResponseDto>>(`/pedido/${id}`);
    return response.data.data;
  },

  create: async (data: CheckoutRequestDto): Promise<PedidoResponseDto> => {
    const response = await api.post<ApiResponse<PedidoResponseDto>>('/pedido/checkout', data);
    return response.data.data;
  }
};
