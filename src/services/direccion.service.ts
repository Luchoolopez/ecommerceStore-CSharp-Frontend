import api from './api';
import type { DireccionDto, CreateDireccionDto } from '../types/direccion.types';

export const direccionService = {
  getAll: async (): Promise<DireccionDto[]> => {
    const response = await api.get<DireccionDto[]>('/direccion');
    return response.data;
  },

  create: async (data: CreateDireccionDto): Promise<DireccionDto> => {
    const response = await api.post<DireccionDto>('/direccion', data);
    return response.data;
  },

  update: async (id: number, data: Partial<CreateDireccionDto>): Promise<DireccionDto> => {
    const response = await api.put<DireccionDto>(`/direccion/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/direccion/${id}`);
  }
};
