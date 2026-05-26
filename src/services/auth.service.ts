import api from './api';
import type { LoginDto, RegisterDto, AuthResponseDto } from '../types/auth.types';
import type { ApiResponse } from '../types/common.types';

export const authService = {
  login: async (data: LoginDto): Promise<AuthResponseDto> => {
    const response = await api.post<ApiResponse<AuthResponseDto>>('/auth/login', data);
    return response.data.data;
  },

  register: async (data: RegisterDto): Promise<AuthResponseDto> => {
    const response = await api.post<ApiResponse<AuthResponseDto>>('/auth/register', data);
    return response.data.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};
