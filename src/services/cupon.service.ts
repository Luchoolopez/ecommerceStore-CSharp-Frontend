import api from './api';
import type { CuponDto } from '../types/cupon.types';

export const cuponService = {
  validate: async (codigo: string): Promise<CuponDto> => {
    const response = await api.get<CuponDto>(`/cupon/codigo/${codigo}`);
    return response.data;
  }
};
