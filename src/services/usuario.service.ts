import api from './api';
import type { UsuarioResponseDto, UpdateUsuarioDto } from '../types/usuario.types';
import type { ApiResponse } from '../types/common.types';

export const usuarioService = {
  getProfile: async (userId: number): Promise<UsuarioResponseDto> => {
    const response = await api.get<ApiResponse<UsuarioResponseDto>>(`/usuarios/${userId}`);
    return response.data.data;
  },

  updateProfile: async (userId: number, data: UpdateUsuarioDto): Promise<UsuarioResponseDto> => {
    const response = await api.put<ApiResponse<UsuarioResponseDto>>(`/usuarios/${userId}`, data);
    return response.data.data;
  }
};
