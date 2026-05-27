import { useState } from 'react';
import { authService } from '../services/auth.service';
import type { LoginDto, RegisterDto, AuthResponseDto } from '../types/auth.types';

export const useAuth = () => {
  const [user, setUser] = useState<AuthResponseDto['usuario'] | null>(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginDto) => {
    try {
      setLoading(true);
      setError(null);
      const res = await authService.login(data);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.usuario));
      setUser(res.usuario);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      setLoading(true);
      setError(null);
      const res = await authService.register(data);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.usuario));
      setUser(res.usuario);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al registrarse');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, login, register, logout, loading, error };
};
