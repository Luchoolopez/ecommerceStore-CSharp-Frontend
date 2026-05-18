import { useState } from 'react';
import { cuponService } from '../services/cupon.service';
import type { CuponDto } from '../types/cupon.types';

export const useCupones = () => {
  const [cuponActivo, setCuponActivo] = useState<CuponDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCupon = async (codigo: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await cuponService.validate(codigo);
      setCuponActivo(data);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Cupón inválido o expirado');
      setCuponActivo(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeCupon = () => {
    setCuponActivo(null);
    setError(null);
  };

  return { cuponActivo, validateCupon, removeCupon, loading, error };
};
