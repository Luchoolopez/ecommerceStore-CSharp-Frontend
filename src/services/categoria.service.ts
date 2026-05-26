import api from './api';
import type { CategoriaDto } from '../types/categoria.types';
import type { ApiResponse } from '../types/common.types';

export const categoriaService = {
  getAll: async (): Promise<CategoriaDto[]> => {
    const response = await api.get<ApiResponse<CategoriaDto[]>>('/categoria');
    return response.data.data;
  },

  getById: async (id: number): Promise<CategoriaDto> => {
    const response = await api.get<ApiResponse<CategoriaDto>>(`/categoria/${id}`);
    return response.data.data;
  }
};
