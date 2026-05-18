export interface UsuarioDto {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: string;
  activo: boolean;
  fechaRegistro: string;
}

export interface UpdateUsuarioDto {
  nombre?: string;
  apellido?: string;
  telefono?: string;
}
