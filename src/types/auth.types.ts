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
  token: string;
  user: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    rol: string;
  };
}
