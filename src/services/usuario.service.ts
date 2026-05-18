import api from './api';
import type { UsuarioDto, UpdateUsuarioDto } from '../types/usuario.types';

export const usuarioService = {
  getProfile: async (userId: number): Promise<UsuarioDto> => {
    const response = await api.get<UsuarioDto>(`/usuarios/${userId}`);
    return response.data;
  },

  updateProfile: async (userId: number, data: UpdateUsuarioDto): Promise<UsuarioDto> => {
    const response = await api.put<UsuarioDto>(`/usuarios/${userId}`, data);
    return response.data;
  }
};
