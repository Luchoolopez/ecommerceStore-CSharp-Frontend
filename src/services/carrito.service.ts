import api from './api';
import type { CarritoDto } from '../types/carrito.types';
import type { ApiResponse } from '../types/common.types';

export const carritoService = {
  getCarrito: async (): Promise<CarritoDto> => {
    const response = await api.get<ApiResponse<CarritoDto>>('/carrito');
    return response.data.data;
  },

  addItem: async (varianteId: number, cantidad: number): Promise<CarritoDto> => {
    const response = await api.post<ApiResponse<CarritoDto>>('/carrito/items', { varianteId, cantidad });
    return response.data.data;
  },

  removeItem: async (varianteId: number): Promise<CarritoDto> => {
    const response = await api.delete<ApiResponse<CarritoDto>>(`/carrito/items/${varianteId}`);
    return response.data.data;
  },

  clearCarrito: async (): Promise<void> => {
    await api.delete('/carrito');
  }
};
