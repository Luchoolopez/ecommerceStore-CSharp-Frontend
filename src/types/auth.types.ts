export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  nombre: string;
  email: string;
  password: string;
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
