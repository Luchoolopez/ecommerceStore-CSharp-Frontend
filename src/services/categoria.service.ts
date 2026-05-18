import api from './api';
import type { CategoriaDto } from '../types/categoria.types';

export const categoriaService = {
  getAll: async (): Promise<CategoriaDto[]> => {
    const response = await api.get<CategoriaDto[]>('/categoria');
    return response.data;
  },

  getById: async (id: number): Promise<CategoriaDto> => {
    const response = await api.get<CategoriaDto>(`/categoria/${id}`);
    return response.data;
  }
};
