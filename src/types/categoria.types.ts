export interface CategoriaDto {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  activo: boolean;
  padreId?: number;
}
