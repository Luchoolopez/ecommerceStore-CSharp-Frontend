import api from './api';
import type { CarritoDto } from '../types/carrito.types';

export const carritoService = {
  getCarrito: async (): Promise<CarritoDto> => {
    const response = await api.get<CarritoDto>('/carrito');
    return response.data;
  },

  addItem: async (varianteId: number, cantidad: number): Promise<CarritoDto> => {
    const response = await api.post<CarritoDto>('/carrito/items', { varianteId, cantidad });
    return response.data;
  },

  removeItem: async (varianteId: number): Promise<CarritoDto> => {
    const response = await api.delete<CarritoDto>(`/carrito/items/${varianteId}`);
    return response.data;
  },

  clearCarrito: async (): Promise<void> => {
    await api.delete('/carrito');
  }
};
