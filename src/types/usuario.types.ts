export type RolUsuario = 'usuario' | 'admin';

export interface UsuarioResponseDto {
  id: number;
  nombre: string;
  email: string;
  rol: RolUsuario;
  telefono?: string;
  activo: boolean;
  fechaCreacion: string;
}

// Para actualizar desde admin
export interface UpdateUsuarioDto {
  nombre?: string;
  telefono?: string;
  activo?: boolean;
}
