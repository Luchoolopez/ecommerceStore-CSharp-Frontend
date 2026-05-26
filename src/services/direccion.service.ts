import api from './api';
import type { DireccionDto, CreateDireccionDto } from '../types/direccion.types';
import type { ApiResponse } from '../types/common.types';

export const direccionService = {
  getAll: async (): Promise<DireccionDto[]> => {
    const response = await api.get<ApiResponse<DireccionDto[]>>('/direccion');
    return response.data.data;
  },

  create: async (data: CreateDireccionDto): Promise<DireccionDto> => {
    const response = await api.post<ApiResponse<DireccionDto>>('/direccion', data);
    return response.data.data;
  },

  update: async (id: number, data: Partial<CreateDireccionDto>): Promise<DireccionDto> => {
    const response = await api.put<ApiResponse<DireccionDto>>(`/direccion/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/direccion/${id}`);
  }
};
