import api from './api';
import type { ProductoResponseDto, ProductoFilterDto } from '../types/producto.types';
import type { ApiResponse, PagedResponse } from '../types/common.types';

export const productoService = {
  getAll: async (params?: ProductoFilterDto): Promise<PagedResponse<ProductoResponseDto>> => {
    const response = await api.get<ApiResponse<PagedResponse<ProductoResponseDto>>>('/producto', { params });
    return response.data.data;
  },

  getById: async (id: number): Promise<ProductoResponseDto> => {
    const response = await api.get<ApiResponse<ProductoResponseDto>>(`/producto/${id}`);
    return response.data.data;
  }
};
