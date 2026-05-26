import api from './api';
import type { UsuarioDto, UpdateUsuarioDto } from '../types/usuario.types';
import type { ApiResponse } from '../types/common.types';

export const usuarioService = {
  getProfile: async (userId: number): Promise<UsuarioDto> => {
    const response = await api.get<ApiResponse<UsuarioDto>>(`/usuarios/${userId}`);
    return response.data.data;
  },

  updateProfile: async (userId: number, data: UpdateUsuarioDto): Promise<UsuarioDto> => {
    const response = await api.put<ApiResponse<UsuarioDto>>(`/usuarios/${userId}`, data);
    return response.data.data;
  }
};
