export interface LoginDto {
  email: string;
  passwordHash: string;
}

export interface RegisterDto {
  nombre: string;
  apellido: string;
  email: string;
  passwordHash: string;
  telefono?: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    rol: string;
    telefono?: string;
    activo: boolean;
    fechaCreacion: string;
  };
}
