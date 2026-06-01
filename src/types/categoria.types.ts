export interface CategoriaDto {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
  fechaCreacion: string;
}

export interface CreateCategoriaDto {
  nombre: string;
  descripcion: string;
}

export interface UpdateCategoriaDto {
  nombre?: string;
  descripcion?: string;
  activo?: boolean;
}
