import api from './api';
import type { CuponDto } from '../types/cupon.types';
import type { ApiResponse } from '../types/common.types';

export const cuponService = {
  validate: async (codigo: string): Promise<CuponDto> => {
    const response = await api.get<ApiResponse<CuponDto>>(`/cupon/codigo/${codigo}`);
    return response.data.data;
  }
};
